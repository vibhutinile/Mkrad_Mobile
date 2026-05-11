const isProduction = true;
const baseUrl = isProduction
  ? `https://mkradlandscapeandlawncare.com/`
  : 'https://www.nileprojects.in/mkrad';
// const baseUrl = 'https://mkradlandscapeandlawncare.com/';
//const baseUrl='https://mkradlandscapeandlawncare.com/v1/'
//https://mkradlandscapeandlawncare.com/staging
//https://mkradlandscapeandlawncare.com/
//
//API END POINT LISTS

export const customer_name_list = 'api/v1/customers';
export const admin_login = 'api/v1/login';
export const crewlead_login = 'api/v1/crew-lead-login';
export const crew_lead_name_list = 'api/v1/crew-lead';
export const get_JobList = 'api/v1/job-list';
export const post_schedule_job = 'api/v1/schedule-job';
export const get_schedule_job = 'api/v1/schedule-job';
export const get_cancel_jobList = 'api/v1/cancelled/job-list';
export const get_activeInactiveCrewLaedList = 'api/v1/crew-lead';
export const changePassword = 'api/v1/change/password';
export const update_profile = 'api/v1/update/profile';
export const reschedule_job = 'api/v1/reschedule/job';
export const frequencies_list = 'api/v1/frequencies';
export const crewlaedjob_list = 'api/v1/crew-lead/job/list/updated';
export const crewlaedPausejob_list = 'api/v1/crew-lead/job/pause';
export const crewlaedJobCompleted = 'api/v1/crew-lead/job/completed/update';
export const pauseJobPost = 'api/v1/crew-lead/job/paused';
export const forgotpassword = 'api/v1/forgot-password';
export const ForgetPasswordUpdate = 'api/v1/forgot-password/update';
export const completedJobList = 'api/v1/crew-lead/job/complete';
export const get_crewLeadJobList = 'api/v1/crew-lead/job/list';
export const postResumejob = 'api/v1/crew-lead/job/paused/resume';
export const LogoutApi = 'api/v1/logout';
export const NotificationListApi = 'api/v1/notifications';
export const checkAvilability = 'api/v1/check-vailability';
export const SignUpStatus = 'api/v1/status';
export const addcustomerList = 'api/v1/customers';
export const getstateList = 'api/v1/states';
export const getIncompleteList = 'api/v1/imcomplete/job';
export const getAdminPauseList = 'api/v1/paused/job';
export const getSchaduledList = 'api/v1/job-list';
export const JobStartTime = 'api/v1/crew-lead/job/set-time';
export const searchUser = 'api/v1/search/user';
export const crewMemberLogin = 'api/v1/crew-member-login';
export const crewMemberforgotPassword = 'api/v1/forgot-password';
export const crewMemberupdatePassword = 'api/v1/forgot-password/update';
export const crewMemberCheckIn = 'api/v1/check-in/time';
export const crewMemberCheckOut = 'api/v1/check-out/time';
export const crewMemberAttendanceLog = 'api/v1/attendance';
export const crewMemberList = 'api/v1/crew-member';
export const crewMemberList_details = 'api/v1/attendance/detail/';
export const forget_checkout = 'api/v1/forget/check-out/time';
export const assign_crewmember_to_crewlead =
  'api/v1/assign-crewmember-to-crewlead';
export const crewmember_assignlist = 'api/v1/crew-member-assign-list';
export const edit_crewmember_assignlist =
  'api/v1/assign-crewmember-to-crewlead/edit/';
export const update_crewmember_assignlist =
  'api/v1/assign-crewmember-to-crewlead/update/';
export const delete_crewmember_assignlist =
  'api/v1/assign-crewmember-to-crewlead/delete/';
export const pauseJobsetTime = 'api/v1/crew-lead/job/paused-job-set-time';
export const mulch_ids = 'api/v1/mulch-ids';
export const turf_ids = 'api/v1/turf-ids';
export const lead_source = 'api/v1/lead-source';
export const customer_detail = 'api/v1/customer/detail';
export const delete_account = 'api/v1/delete-account';
export const customer_dropdown_data = 'api/v1/dropdown';

export const requestGetApi = async (endPoint, body, method, token) => {
  var header = {};
  var url = baseUrl + endPoint;

  header = {
    'Content-type': 'application/json',
    'Cache-Control': 'no-cache',
    Authorization: 'Bearer ' + token,
  };

  url = url + objToQueryString(body);
  console.log('GET URL:-' + url + '\n');

  try {
    let response = await fetch(url, {
      method: method,
      headers: header,
    });

    let code = await response.status;

    if (code == 200) {
      let responseJson = await response.json();
      if (
        endPoint &&
        (endPoint.includes('crew-lead/job/list/updated') ||
          endPoint.includes('crew-lead/job/pause'))
      ) {
        try {
          console.log(
            `[API_RESPONSE] ${endPoint}\n` +
              JSON.stringify(responseJson, null, 2),
          );
        } catch (e) {}
      }
      return {responseJson: responseJson, err: null, code: code};
    } else if (code == 400) {
      let responseJson = await response.json();
      return {responseJson: null, err: responseJson.message, code: code};
    } else {
      return {responseJson: null, err: 'Something went wrong!', code: code};
    }
  } catch (error) {
    return {
      responseJson: null,
      err: 'Something Went Wrong! Please check your internet connection.',
      code: 500,
    };
    console.error(error);
  }
};

export const requestPostApiMedia = async (
  endPoint,
  formData,
  method,
  token,
) => {
  var header = {
    'Content-type': 'multipart/form-data',
    Authorization: 'Bearer ' + token,
  };

  var url = baseUrl + endPoint;
  console.log('POST Url:-' + url + '\n');
  console.log('POST DATA:-', JSON.stringify(formData) + '\n');

  try {
    let response = await fetch(url, {
      method: method,
      body: formData,
      headers: header,
    });
    let code = await response.status;

    if (code == 200) {
      let responseJson = await response.json();
      return {responseJson: responseJson, err: null};
    } else if (code == 400) {
      let responseJson = await response.json();
      return {responseJson: null, err: responseJson.message};
    } else {
      return {responseJson: null, err: 'Something went wrong!'};
    }
  } catch (error) {
    return {
      responseJson: null,
      err: 'Something Went Wrong! Please check your internet connection.',
    };
    console.error(error);
  }
};

const objToQueryString = (obj) => {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
    );
  }
  return keyValuePairs.length == 0 ? '' : '?' + keyValuePairs.join('&');
};
