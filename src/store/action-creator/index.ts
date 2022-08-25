import * as UserActionCreators from '../action-creator/user';
import * as ContactActionCreators from '../action-creator/contact';

export default {
    ...UserActionCreators,
    ...ContactActionCreators
}