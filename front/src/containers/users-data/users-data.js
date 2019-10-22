import React, {Component, Fragment} from 'react';
import SimpleTable from '../../components/Table';
import InputField from '../../components/Input';
import UIButton from '../../components/Button';
import { postData, getPaginationData } from './API/index';
import './users-data.scss'
class UsersDataTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            tableHeaders: [
                "Dessert (100g serving)",
                "Calories",
                "Fat (g)",
                "Carbs (g)",
                "Protein (g)"
            ],
            rowsData: [
                this.createData('Frozen yoghurt local', 159, 6.0, 24, 4.0),
                this.createData('Ice cream sandwich local', 237, 9.0, 37, 4.3),
                this.createData('Eclair local', 262, 16.0, 24, 6.0),
                this.createData('Cupcake local', 305, 3.7, 67, 4.3),
                this.createData('Gingerbread local', 356, 16.0, 49, 3.9),
            ],
            editRowID: '',
            rowsPerPage: 5,
            page: 0,
            error: false,
            totalRecordsCount: 0
        }

        this.editData = this.editData.bind(this)
        this.deleteData = this.deleteData.bind(this)
        this.triggerEdit = this.triggerEdit.bind(this)
        this.stopEdit = this.stopEdit.bind(this)
        this.sendToServer = this.sendToServer.bind(this)
        this.submitFormHandler = this.submitFormHandler.bind(this)
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
        this.handleChangePage = this.handleChangePage.bind(this)
        this.sendPayloadToServer = this.sendPayloadToServer.bind(this)
    }

    createData = (name, calories, fat, carbs, protein) => {
        return { name, calories, fat, carbs, protein };
    }

    triggerEdit(name){
        this.setState({editRowID: name})
    }
    
    stopEdit(){
        this.setState({editRowID: ''})
    }

    editData(e, fieldName, rowID){
        const {value} = e.target;
        this.setState(state =>({
           rowsData: state.rowsData.map(row => row.name==rowID ? ({...row, [fieldName]:value}) : row) 
        }))
    }

    deleteData(name){
        this.setState(state => ({
            rowsData: state.rowsData.filter(row => row.name!==name)
        }))
    }

    sendToServer(){
        postData(this.state.rowsData);
    }

    sendPayloadToServer(payload){
        return postData(payload);

    }

    submitFormHandler(event){
        event.preventDefault();
        const data = new FormData(event.target);
        // I am treating the name as if it is an ID
        // you can't create New Row without supplying a name
        // there could be other forms of validation that can be made. 
        // like for example checking if the fields other than Name field are numbers or not
        if(data.get('name')){
            const newRow = this.createData(data.get('name'),data.get('cal'),data.get('fat'),data.get('carb'),data.get('protein'))
            
            // A change is made here, now on adding a row of data we first send it to the server and add it there
            // if the addition occured successfuly then we add it to our UI, this will make the data in sync with
            // the server
            this.sendPayloadToServer([...this.state.rowsData,newRow]).then(res => {
                if(res.status !== 200){
                    // if the API response status is anything other than 200, then we don't want to change the 
                    // state of the APP because server didn't achieve the writing to its database
                }else{
                    this.setState(state => ({
                        rowsData: [...state.rowsData,newRow]
                    }))
                }
                
            })

        }
        

    }
    
    handleChangeRowsPerPage(event){
        this.setState( state =>({
            rowsPerPage: event.target.value,
            page: 0
        }))
    }

    handleChangePage(event, newPageNumber){

        getPaginationData({"pageSize": 5, "pageNumber":newPageNumber}).then(res => {
            res.json().then(body => {
                let serverData = body.result.map(row => this.createData(row.name, row.calories, row.fat, row.carbs, row.protein))
                this.setState(state => ({
                    rowsData: serverData,
                    totalRecordsCount: body.totalRecords,
                    page: newPageNumber
                }))
            })
        })
    }

    componentDidMount(){

        getPaginationData({"pageSize": 5, "pageNumber":this.state.page}).then(res => {
            res.json().then(body => {
                let serverData = body.result.map(row => this.createData(row.name, row.calories, row.fat, row.carbs, row.protein))
                this.setState(state => ({
                    rowsData: serverData,
                    totalRecordsCount: body.totalRecords
                }))
            })
        })

    }

    render(){
        return(
            <Fragment>
                {/* change to Material UI later https://material-ui.com/api/form-control/ */}
                <form  onSubmit={this.submitFormHandler}>
                    <label>
                        <InputField name="name" placeholder={"Dessert Name:"}></InputField>
                    </label><br></br>
                    <label>
                        <InputField name="cal" placeholder={"Calories:"}></InputField>
                    </label><br></br>
                    <label>
                        <InputField name="fat" placeholder={"Fat:"}></InputField>
                    </label><br></br>
                    <label>
                        <InputField name="carb" placeholder={"Carbs:"}></InputField>
                    </label><br></br>
                    <label>
                        <InputField name="protein" placeholder={"Protein:"}></InputField>
                    </label><br></br>
                    <UIButton text="ADD" type="submit"></UIButton>
                </form>
                <SimpleTable
                    rows={this.state.rowsData}
                    headers={this.state.tableHeaders}
                    editRowID={this.state.editRowID}
                    triggerEdit={this.triggerEdit}
                    stopEdit={this.stopEdit}
                    edit={this.editData}
                    delete={this.deleteData}
                    page={this.state.page}
                    rowsPerPage={this.state.rowsPerPage}
                    recordsCount={this.state.totalRecordsCount}
                    handleChangePage={this.handleChangePage}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                >
                </SimpleTable>
                <UIButton  onClick={this.sendToServer} text="Submit" type=""></UIButton>
            </Fragment>
        )
    }
}

export default UsersDataTable;