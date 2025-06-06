import { connect } from 'react-redux'
import * as TodoActions from '../actions'
import { bindActionCreators } from 'redux'
import MainSection from '../components/MainSection'
import { getCompletedTodoCount } from '../selectors'

const mapStateToProps = state => ({
  todosCount: state.todos.present.length,
  completedCount: getCompletedTodoCount(state),
  canUndo: state.todos.past.length > 0,
  canRedo: state.todos.future.length > 0
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection)