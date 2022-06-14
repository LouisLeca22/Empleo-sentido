import { DISPLAY_ALERT, CLEART_ALERT, SETUP_USER_START, SETUP_USER_SUCCESS, SETUP_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_START, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, HANDLE_CHANGE, CLEAR_VALUES, CREATE_JOB_START, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, GET_JOBS_START, GET_JOBS_SUCCESS, SET_EDIT_JOB, DELETE_JOB_START, EDIT_JOB_START, EDIT_JOB_SUCCESS, EDIT_JOB_ERROR, SHOW_STATS_START, SHOW_STATS_SUCCESS, CLEAR_FILTERS, CHANGE_PAGE} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.text,
      };
    case CLEART_ALERT:
      return {
        ...state,
        showAlert: false,
        alertText: "",
        alertType: "",
      };
    case SETUP_USER_START:
      return {
        ...state, 
        isLoading: true
      }
    case SETUP_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        location: action.payload.location,
        jobLocation: action.payload.location,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: action.payload.alertText
      }
    case SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg
      }
      case UPDATE_USER_START:
        return {
          ...state, 
          isLoading: true
        }
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.tokenn,
          location: action.payload.location,
          jobLocation: action.payload.location,
          isLoading: false,
          showAlert: true,
          alertType: "success",
          alertText: "¡El usuario ha sido actualizado!"
        }
      case UPDATE_USER_ERROR:
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: "danger",
          alertText: action.payload.msg
        }
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar
      }
    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: null,
        location: "",
        jobLocation: ""
      }
    case HANDLE_CHANGE:
      return {
        ...state, 
        page: 1,
        [action.payload.name]: action.payload.value
      }
    case CLEAR_VALUES:
      return {
        ...state, 
        isEditing: false,
        editJobId: "",
        position: "",
        company: "",
        jobLocation: state.userLocation,
        jobTypes: "tiempo completo",
        status: "pendiente"
      }
    case CREATE_JOB_START:
      return {
        ...state, isLoading: true
      }
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "¡Oferta creada!"
      }
    case CREATE_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg
      }
    case GET_JOBS_START:
      return {
        ...state,
        isLoading: true, 
        showAlert: false
      }
    case GET_JOBS_SUCCESS:
      return{
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numOfPages
      }
    case SET_EDIT_JOB:
      const job = state.jobs.find((job) => job._id === action.payload.id )
      const {_id, position, company, jobLocation, jobType, status } = job
      return{
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation, 
        jobType, 
        status
      }
    case DELETE_JOB_START: 
      return {
        ...state, 
        isLoading: true
      }
    case EDIT_JOB_START:
      return {
        ...state,
        isLoading: true
      }
    case EDIT_JOB_SUCCESS: 
      return {
        ...state,
        isLoading: false, 
        showAlert: true,
        alertType: "success",
        alertText: "¡La oferta ha sido modificada!",
      }

    case EDIT_JOB_ERROR:
      return {
        ...state, 
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg
      }

    case SHOW_STATS_START:
      return {
        ...state,
        isLoading: true,
        showAlert: false
      }
    case SHOW_STATS_SUCCESS:
      return {
        ...state, 
        isLoading: false,
        stats: action.payload.stats,
        monthlyApplications: action.payload.monthlyApplications
      }
    case CLEAR_FILTERS:
      return {
        ...state,
        search: "",
        searchStatus: "todos",
        searchType: "todos",
        sort: "más recientes",
      }
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page
      }
    default:
      return state;
  }
};

export default reducer;
