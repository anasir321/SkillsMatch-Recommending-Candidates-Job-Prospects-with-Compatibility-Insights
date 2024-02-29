export default class GlobClass {
    static userDetails = {
      candidate_Id: '',
      hr_Id:'',
    };
    
  
    static setUserDetails(candidate_Id,hr_Id) {
      this.userDetails.candidate_Id = candidate_Id;
      this.userDetails.hr_Id = hr_Id;
    }
    static logUserDetails() {
      console.log(`Candidate ID: ${this.userDetails.candidate_Id}, HR ID: ${this.userDetails.hr_Id}`);
    }
  
    static getUserDetails() {
      return this.userDetails;
    }
  
    static getUserId() {
      return this.userDetails.candidate_Id;
    }

    static getHrid() {
      return this.userDetails.hr_Id;
    }
  
  
    // Set the user details in a cookie
  static setUserDetailsInCookie(candidate_Id,hr_Id) {
    const userDetails = {
      candidate_Id: candidate_Id,
      hr_Id:hr_Id,
    };
    document.cookie = `userDetails=${JSON.stringify(userDetails)}; path=/`;
  }
  
  // Get the user details from the cookie
  static getUserDetailsFromCookie() {
    const userDetailsCookie = document.cookie.split('; ').find(row => row.startsWith('userDetails='));
    if (userDetailsCookie) {
      const userDetailsJson = userDetailsCookie.split('=')[1];
      return JSON.parse(userDetailsJson);
    } else {
      return null;
    }
  }
  
  static getUserIdFromCookie() {
    const userDetails = this.getUserDetailsFromCookie();
    if (userDetails) {
      return userDetails.candidate_Id;
    } else {
      return null;
    }
  }
  static getHrFromCookie() {
    const userDetails = this.hr_Id();
    if (userDetails) {
      return userDetails.branchCode;
    } else {
      return null;
    }
  }
  }
  
  