import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';

class ManageCoursePage extends React.Component {
    constructor(props, context){
        super(props, context);
    } 
    render(){
        return(
            <div>
                <h1>Manage Course</h1>         
            </div>
        );
    }
}
ManageCoursePage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};
function mapStateToProps(state, _ownProps){
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
