import React, { Component } from 'react';
import Tabs from '@nokia-csf-uxr/csfWidgets/Tabs';
import Tab from '@nokia-csf-uxr/csfWidgets/Tabs/Tab';
import SvgIcon from '@nokia-csf-uxr/csfWidgets/SvgIcon';
import AlertDialogConfirm from '@nokia-csf-uxr/csfWidgets/AlertDialogConfirm';
import { property } from 'lodash';
import TextInput from '@nokia-csf-uxr/csfWidgets/TextInput';
import './environment-property.css';



export class EnvironmentProperty extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showDeleteDialog: false,
            editing: false,
            PropertyValue: "",
            currentProperty: null,
            hoverColor: 'white'
        };
    }


    componentDidMount() {
        this.props.fetchEnvironmentProperty()
    }

    handleDeleteClick(Category, PropertyName) {

        this.setState({
            showDeleteDialog: true,
            Category,
            PropertyName

        })
    }

    editedText(value) {
        let target = this.state.currentProperty;
        target.PropertyValue = value;
        this.setState({ currentProperty: target });
    }



    handleEdit(data) {

        this.setState({
            currentProperty: data,
            editing: true
        });

    }

    handleSave(name, category) {
        let { editProperty } = this.props;
        let propertyObj = {
            PropertyName: name,
            PropertyValue: this.state.currentProperty.PropertyValue,
            Category: category
        };
        editProperty(propertyObj).then(() => {
            this.props.fetchEnvironmentProperty();
            this.setState({
                currentProperty: null
            });
        });

    }

    handleClose() {
        this.props.history.push('/environment-property');
        this.setState({
            currentProperty: null
        })
    }

    changeColor() {
        this.setState({ color: 'aqua' })
    }

    resetColor() {
        this.setState({ color: 'white' })
    }




    render() {

        let { environmentProperty } = this.props;




        let initialStatus = (
            <div className="no-environment-property-error environment-property">
                <SvgIcon iconColor="#e85e60" icon="ic_info" />{' '}
                <span>No environment properties found. Please add a property</span>
            </div>
        );



        if (environmentProperty.EnvironmentProperties && environmentProperty.EnvironmentProperties.length > 0) {
            initialStatus = (
                <div style={{ height: '80vh' }}>

                    <Tabs alignment="left"  >
                        <Tab id="basicTab1" label="All">

                            {environmentProperty.EnvironmentProperties.map((data) => {
                                return (
                                    <table class="table table-hover" >
                                        <tbody>
                                            <tr onMouseEnter={this.changeColor} onMouseLeave={this.resetColor}>
                                                <td colspan="2">{data.PropertyName}</td>
                                                <td colspan="2" style={{ width: "80%" }} >{(this.state.currentProperty && this.state.currentProperty.PropertyName === data.PropertyName) ? <input type="text" class="form-control" onChange={(e) => this.editedText(e.target.value)} /> : <div>{data.PropertyValue}</div>}</td>
                                                <td>{(this.state.currentProperty && this.state.currentProperty.PropertyName === data.PropertyName) ? <span id="save" onClick={() => this.handleSave(data.PropertyName, data.Category)}>
                                                    <SvgIcon colspan="2" id="SVGIconID" iconColor="#249" icon="ic_save" iconHeight="24px" iconWidth="24px" />
                                                </span>
                                                    : <span id="edit" onClick={() => this.handleEdit(data)}>
                                                        <SvgIcon colspan="2" id="SVGIconID" iconColor="#249" icon="ic_edit" iconHeight="24px" iconWidth="24px" />
                                                    </span>

                                                }
                                                </td>
                                                <td><span id="delete" onClick={() => this.handleDeleteClick(data.Category, data.PropertyName)}>
                                                    <SvgIcon id="SVGIconID" iconColor="#249" icon="ic_delete" iconHeight="24px" iconWidth="24px" />
                                                </span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                );
                            })}
                        </Tab>


                    </Tabs>
                    )

                </div>
            );
            let allCategories = [];
            allCategories = environmentProperty.EnvironmentProperties.map((data) =>
                data.Category
            );
            console.log(allCategories);
            let categories = [...new Set(allCategories)];
            console.log(Object.values(categories))





            let tabs = [];
            for (let category in categories) {
                tabs.push(
                    <Tab
                        id={category}
                        label={categories[`${category}`]}
                    >
                        <table className="table" >
                            <tbody>
                                {environmentProperty.EnvironmentProperties.filter(data => data.Category === categories[`${category}`]).map((data) => {
                                    return (
                                        <tr className="iconvisible">
                                            <td>{data.PropertyName}</td>
                                            <td>{(this.state.currentProperty && this.state.currentProperty.PropertyName === data.PropertyName) ?
                                                <TextInput
                                                    text={this.state.currentProperty.PropertyValue}
                                                    id="property-value"
                                                    placeholder="Property Value"
                                                    onChange={(e) => this.editedText(e.value)}
                                                /> : <div>{data.PropertyValue}</div>}</td>
                                            <div className="icons">
                                                <div>{(this.state.currentProperty && this.state.currentProperty.PropertyName === data.PropertyName) ? <div>
                                                    <span className="icon" id="cancel" onClick={() => this.handleClose()}>
                                                        <SvgIcon colspan="2" id="SVGIconID" iconColor="#249" icon="ic_close" iconHeight="24px" iconWidth="24px" />
                                                    </span></div> : null}</div>
                                                <div>{(this.state.currentProperty && this.state.currentProperty.PropertyName === data.PropertyName) ?

                                                    <span className="icon" id="save" onClick={() => this.handleSave(data.PropertyName, data.Category)}>
                                                        <SvgIcon id="SVGIconID" iconColor="#249" icon="ic_save" iconHeight="24px" iconWidth="24px" />
                                                    </span>
                                                    :
                                                    <span className="icon" id="edit" onClick={() => this.handleEdit(data)}>
                                                        <SvgIcon id="SVGIconID" iconColor="#249" icon="ic_edit" iconHeight="24px" iconWidth="24px" />
                                                    </span>

                                                }</div></div>

                                            <div style={{ float: "right" }}><span className="icon" id="delete" onClick={() => this.handleDeleteClick(data.Category, data.PropertyName)}>
                                                <SvgIcon id="SVGIconID" iconColor="#249" icon="ic_delete" iconHeight="24px" iconWidth="24px" />
                                            </span></div>

                                        </tr>

                                    );

                                })}
                            </tbody>
                        </table>
                    </Tab>
                );
            }


            if (tabs.length > 0) {
                initialStatus = (
                    <Tabs alignment="left" selectedIndex={this.state.selectedIndex}>
                        {tabs}
                    </Tabs>
                );
            }


        }

        return (
            <div className="env-property-container">{initialStatus}
                {this.state.showDeleteDialog && (
                    <AlertDialogConfirm
                        id="property-delete-confirm"
                        title="Are you sure, you want to delete this Property?"
                        confirmationText1="This action will delete the following Property"
                        confirmationText2={`Property Name = ${this.state.PropertyName}, Category = ${this.state.Category}`}
                        confirmationButtonLabel="DELETE"
                        onClose={() => this.setState({ showDeleteDialog: false })}
                        onConfirm={() =>
                            this.props
                                .deleteProperty(
                                    this.state.Category,
                                    this.state.PropertyName
                                )
                                .then(() => {
                                    this.props.fetchEnvironmentProperty();
                                    this.setState({ showDeleteDialog: false });
                                })
                        }
                    />
                )}
            </div>


        );
    }
}

export default EnvironmentProperty;