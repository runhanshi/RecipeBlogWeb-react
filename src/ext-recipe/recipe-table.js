import React, { Component } from 'react';

class RecipeTable extends Component {
    render() {
        let heading = ['Ingredient', 'Measure'];
        let body = this.props.param;
        return (
            <div >
                <Table heading={heading} body={body} />
            </div>
        );
    }
}

class Table extends Component {
    render() {
        let heading = this.props.heading;
        let body = this.props.body;
        return (
            <table style={{ width: 500 }}>
                <thead>
                    <tr>
                        {heading.map(head => <th>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {body.map(row => <TableRow row={row} />)}
                </tbody>
            </table>
        );
    }
}

class TableRow extends Component {
    render() {
        let row = this.props.row;
        return (
            <tr>
                {row.map(val => <td>{val}</td>)}
            </tr>
        )
    }
}

export default RecipeTable;