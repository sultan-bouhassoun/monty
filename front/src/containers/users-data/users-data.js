import React, {Component, Fragment} from 'react';
import SimpleTable from '../../components/Table';
import { getData, postData } from './API/index';
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
            editRowID: ''
        }

        this.editData = this.editData.bind(this)
        this.deleteData = this.deleteData.bind(this)
        this.triggerEdit = this.triggerEdit.bind(this)
        this.stopEdit = this.stopEdit.bind(this)
        this.sendToServer = this.sendToServer.bind(this)
        this.submitFormHandler = this.submitFormHandler.bind(this)
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

    submitFormHandler(event){
        event.preventDefault();
        const data = new FormData(event.target);
        // I am treating the name as if it is an ID
        // you can't create New Row without supplying a name
        // there could be other forms of validation that can be made. 
        // like for example checking if the fields other than Name field are numbers or not
        if(data.get('name')){
            const newRow = this.createData(data.get('name'),data.get('cal'),data.get('fat'),data.get('carb'),data.get('protein'))
            this.setState(state => ({
                rowsData: [...state.rowsData,newRow]
            }))
        }

    }

    componentDidMount(){
        getData.then(res => {
            res.json().then(body => {
                let serverData = body.map(row => this.createData(row.name, row.calories, row.fat, row.carbs, row.protein))
                this.setState(state => ({
                    rowsData: serverData
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
                        <input type="text" name="name" placeholder={"Dessert Name:"}/>
                    </label><br></br>
                    <label>
                        <input type="text" name="cal" placeholder={"Calories:"}/>
                    </label><br></br>
                    <label>
                        <input type="text" name="fat" placeholder={"Fat:"}/>
                    </label><br></br>
                    <label>
                        <input type="text" name="carb" placeholder={"Carbs:"}/>
                    </label><br></br>
                    <label>
                        <input type="text" name="protein" placeholder={"Protein:"}/>
                    </label><br></br>
                    <input className={"inputButton"} type="submit" value="ADD"/>
                </form>
                <SimpleTable
                    rows={this.state.rowsData}
                    headers={this.state.tableHeaders}
                    editRowID={this.state.editRowID}
                    triggerEdit={this.triggerEdit}
                    stopEdit={this.stopEdit}
                    edit={this.editData}
                    delete={this.deleteData}
                >
                </SimpleTable>
                <button onClick={this.sendToServer}>Submit</button>
            </Fragment>
        )
    }
}

export default UsersDataTable;