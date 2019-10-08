import React, {Component} from 'react';
import SimpleTable from '../../components/Table'
import { getData, postData } from './API/index'
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
                this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
                this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
                this.createData('Eclair', 262, 16.0, 24, 6.0),
                this.createData('Cupcake', 305, 3.7, 67, 4.3),
                this.createData('Gingerbread', 356, 16.0, 49, 3.9),
            ],
            editRowID: ''
        }

        this.editData = this.editData.bind(this)
        this.deleteData = this.deleteData.bind(this)
        this.triggerEdit = this.triggerEdit.bind(this)
        this.stopEdit = this.stopEdit.bind(this)
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
        console.log(e, fieldName, rowID);
        const {value} = e.target;
        console.log(value);
        this.setState(state =>({
           rowsData: state.rowsData.map(row => row.name==rowID ? ({...row, [fieldName]:value}) : row) 
        }))
    }

    deleteData(name){
        this.setState(state => ({
            rowsData: state.rowsData.filter(row => row.name!==name)
        }))
    }

    componentDidMount(){
        getData.then(res => {
            res.json().then(body => console.log('sadad',body))
        })
    }

    render(){
        console.log(this.state.rowsData)
        return(
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
        )
    }
}

export default UsersDataTable;