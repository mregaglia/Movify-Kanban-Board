import React from "react";
import { connect } from "react-redux";
import { Table, TableTheadTr, TableContentTh } from "../../style/table_style"

const TablePercentage = () => {

    return (
        <div>
            <Table>
                <thead>
                    <TableTheadTr>
                        <TableContentTh>Conversion %</TableContentTh>
                        <TableContentTh>Total YTD</TableContentTh>
                        <TableContentTh>Average</TableContentTh>
                    </TableTheadTr>
                </thead>
                <tbody>

                </tbody>
            </Table>
        </div>
    )
}

TablePercentage.propTypes = {
};

export default connect(
    state => ({
    }),
    {}
)(TablePercentage);