import axios from 'axios';

export class ActivityService {

    activitiesUrl = '/api/activities';

    createActivity(activity, datetime) {
        return new Promise((resolve, reject) => {
            axios.post(this.activitiesUrl, {
                title: activity,
                datetime: datetime
            }).then(response => {
                if(response.status === 200) {
                    resolve(response.data);
                } else {
                    resolve(false);
                }
            }).catch(error => {
                reject(error);
            });
        });
    }

    getActivities() {
        return new Promise((resolve, reject) => {
            axios.get(this.activitiesUrl)
                .then(response => {
                    if (response.data) {
                        resolve(response.data);
                    }
                }).catch(error => {
                    reject(error);
                });
        });
    }

    updateActivity(updatedActivity) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.activitiesUrl}/${updatedActivity._id}`, updatedActivity)
                .then(response => {
                    if(response.status === 200) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }).catch(error => {
                    reject(error);
                });
        });
    }

    deleteActivity(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`${this.activitiesUrl}/${id}`)
                .then(response => {
                    if(response.status === 200) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }).catch(error => {
                    reject(error);
                });
        });
    }
} 
