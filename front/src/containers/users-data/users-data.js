import React, {Component} from 'react';
import SimpleTable from '../../components/Table'

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
            ]
        }

        
    }

    createData = (name, calories, fat, carbs, protein) => {
        return { name, calories, fat, carbs, protein };
    }
      

    render(){
        return(
            <SimpleTable rows={this.state.rowsData} headers={this.state.tableHeaders}>
            </SimpleTable>
        )
    }
}

export default UsersDataTable;