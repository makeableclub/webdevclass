const APIURL = '/api/tasks/';

export async function getTasks() {
  return fetch(APIURL)
    .then(response => {
      if (!response.ok) {
          let error = {errorMessage: "Failed to get response from server"}
          throw error;
      }
      return response.json();
    })
}
