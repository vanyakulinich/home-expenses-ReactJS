import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle";



function CustomTable({ ...props }) {
 
  const { classes, tableHead, tableData, tableHeaderColor, inside} = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          { 
            tableData.map((prop, key) => {
              if(prop.children) {
                return ( prop.value ?
                          <TableRow key={1+key+prop._id}>
                            <TableCell className={inside ? classes.border : classes.tableReports} key={prop._id+key}>
                                {prop.category}
                            </TableCell>
                            <TableCell className={inside ? classes.border : classes.tableReports} 
                                        key={key+prop._id}>
                                  {prop.value}
                                <CustomTable
                                  tableHeaderColor="primary"
                                  tableHead={undefined}
                                  tableData={prop.children}
                                  classes={classes}
                                  inside={true}
                                />
                            </TableCell>
                          </TableRow> : null
                )
              }
              return ( prop.value ? 
                        <TableRow key={1+key+prop._id}>
                              <TableCell className={prop.parent ? classes.border : classes.tableReports} 
                                         key={prop._id}>
                                {prop.category}
                                
                              </TableCell>
                              <TableCell className={prop.parent ? classes.border : classes.tableReports} 
                                         key={prop._id+key+1}>
                                {prop.value}
                                
                              </TableCell>
                        </TableRow> : null
              );
            })
          }
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string)
};

export default withStyles(tableStyle)(CustomTable);
