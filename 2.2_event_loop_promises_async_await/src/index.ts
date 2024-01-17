// import fetch from 'node-fetch';

/**
 * Task 2.2.1
 * 
 * Use node-fetch to make an await fetch request await fetch("https://api.ipify.org?format=json"), 
 * get an answer and display your IP address
 */

// A variable containing the URL to get an IP address from the ipify API.
const ipifyApiURL = 'https://api.ipify.org?format=json';

/**
 * Represents the structure of the response from ipify API.
 * @interface
 */
interface IpifyResponse {
    /**
    * The user's IP address.
    * @type {string}
    */
    ip: string;
}
/**
 * Makes a request to the ipify API, gets the user's IP address and displays it on the console.
 * 
 * @returns {Promise<void>}  Does not return a specific value
 */
const displayIpAddress = async (): Promise<void> => {
    try {
        // makes a request to the ipify API
        const response = await fetch(ipifyApiURL);
        // decodes the response in JSON format and processes it as IpifyResponse
        const data = await response.json() as IpifyResponse;
        // Gets the IP address from the unzipped object
        const ipAddress: string = data.ip;
        // Displaying the user's IP address on the console
        console.log(`Task 2.2.1 IP address: ${ipAddress}`);
    } catch (error) {
        // Handling of errors that may occur during the operation
        console.error("Task 2.2.1 error:", error);
    }
};
// Call the function to get and display the IP address
displayIpAddress();


/**
 * Task 2.2.2
 * 
 * Makes a request to the ipify API, gets the user's IP address, and outputs it to the console.
 * We use the interface and URL to obtain the IP address from task 2.2.1
 * 
 * @returns {Promise<string | null>} A string containing the value of the IP address, or null on error.
 */
async function getIpAddress(): Promise<string | null> {
    try {
        // makes a request to the ipify API
        const response = await fetch(ipifyApiURL);
        // decodes the response in JSON format and processes it as IpifyResponse
        const data = await response.json() as IpifyResponse;
        // Gets the IP address from the unzipped object
        const ipAddress: string = data.ip;
        // Return the IP address as the result of a resolved promise
        return ipAddress;
    } catch (error) {
        // Handling of errors that may occur during the operation
        console.error("Task 2.2.2 error: ", error);
        // Return null on error
        return null;
    }
}
// Call a function to get, display, and return an IP address
getIpAddress()
    .then((ipAddress) => {
        if (ipAddress !== null) {
            console.log(`Task 2.2.2 IP address: ${ipAddress}`);
        } else {
            console.log("Unable to retrieve IP address");
        }
    })
    .catch((error) => {
        console.error("Error: ", error);
    });

/**
 * Task 2.2.3
 * 
 * Write a function that returns three names,
 * by making three parallel requests to https://random-data-api.com/api/name/random_name
 */

/** 
 * A data structure for the API response that contains the name as a string.
 * @interface
 */
interface ApiResponse {
    name: string;
}
// Number of names
const numberOfNames = 3;

// A variable containing the URL to query the API that returns a random name.
const randomNameApiURL = 'https://random-data-api.com/api/name/random_name';

/**
 * Subtask 2.2.3.1
 * 
 * An asynchronous function that returns three names will execute three queues in parallel
 * Uses async/await and Promise.all to get and return three names.
 * 
 * @returns {Promise<string[]>} An array of names.
 */
async function getThreeNamesAsyncAwaitAndPromise(): Promise<string[]> {
    /**
     * An asynchronous function that makes a request to the API and returns a name from the response.
     * @returns {Promise<string>} Name from API response.
     */
    async function getNameFromApi(): Promise<string> {
        // We use fetch to make an HTTP request to the API
        const response = await fetch(randomNameApiURL);
        // Checking whether the response is successful (HTTP code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // decodes the response in JSON format and processes it as piResponse
        const data = await response.json() as ApiResponse;
        // We return the name from the received data
        return data.name;
    }

    // Create an array of promises to get a name using the getNameFromApi function
    const namesFromPromises: Promise<string>[] = Array.from({ length: numberOfNames },
        (): Promise<string> => getNameFromApi());

    try {
        // We use Promise.all to simultaneously execute all promises in the array
        const names = await Promise.all(namesFromPromises);
        // If all promises are successfully fulfilled, we return the received name
        return names;
    } catch (error) {
        // Processing of errors that may occur during the execution of promises
        console.error('Task 2.2.3.1 error:', error);
        throw error;
    }
}

// Call the function to get the three names asynchronously using the Promise.all.
getThreeNamesAsyncAwaitAndPromise().then(names => console.log(`Task 2.2.3.1: ${names}`));


/**
 * Subtask 2.2.3.2
 * 
 * A function that returns three names by making three queries in parallel
 * Use async/await but without Promise.all
 * 
 * @returns {Promise<string[]>} An array of names
 */
async function getThreeNamesAsyncAwait(): Promise<string[]> {
    /**
     * An asynchronous function that makes a request to the API and returns a name from the response.
     * @returns {Promise<string>} Name from API response.
     */
    async function getNameFromApi(): Promise<string> {
        // We use fetch to make an HTTP request to the API
        const response = await fetch(randomNameApiURL);
        // Checking whether the response is successful (HTTP code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // We receive data from the response and asynchronously parse it in the form of an ApiResponse
        const data = await response.json() as ApiResponse;
        // We return the name from the received data
        return data.name;
    }

    // We create an array of promises to get the name, use the getNameFromApi function
    const namesFromPromises: Promise<string>[] = Array.from({ length: numberOfNames },
        (): Promise<string> => getNameFromApi());

    // an array of names
    const names: string[] = [];

    // We use a cycle for sequential execution of each promise
    for (const nameFromPromise of namesFromPromises) {
        try {
            // We get the name from the current promise and add it to the array
            const name = await nameFromPromise;
            names.push(name);
        } catch (error) {
            // Processing of errors that may occur during the execution of a promise
            console.error('Task 2.2.3.2 error:', error);
            throw error;
        }
    }
    // We return the received names
    return names;
}

// Calling the function and outputting the result
getThreeNamesAsyncAwait().then(names => console.log(`Task 2.2.3.2: ${names}`));


/**
 * Subtask 2.2.3.3
 * 
 * Uses promises without async/await and Promise.all.
 * 
 * @returns {Promise<string[]>} An array of names
 */
function getThreeNamesByPromises(): Promise<string[]> {

    // генеруємо три запити паралельно
    return new Promise((resolve, reject) => {
        // an array of names
        const names: string[] = [];

        let completedRequests = 0;

        // A function for making a request and processing the result
        function makeRequest(index: number) {
            fetch(randomNameApiURL)
                .then(response => response.json() as Promise<ApiResponse>)
                .then(data => {
                    names[index] = data.name;
                    completedRequests++;

                    // Checking that all three requests are complete
                    if (completedRequests === numberOfNames) {
                        resolve(names);
                    }
                })
                .catch(error => reject(error));
        }

        // We make three requests using a loop
        for (let i = 0; i < numberOfNames; i++) {
            makeRequest(i);
        }
    });
}

// Calling the function and outputting the result
getThreeNamesByPromises().then(names => console.log(`Task 2.2.3.3: ${names}`));


/**
 * Task 2.2.4 Write a function that should get a female user for the minimum number of requests
 */

// The URL to retrieve the random user from the API
const randomUserApiURL = 'https://random-data-api.com/api/users/random_user';

/**
 * Describes an API response about a user with gender information.
 * @interface
 */
interface UserResponse {
    gender: string;
}

/**
 * Subtask 2.2.4.1
 * 
 * Without using async/await.
 * 
 * @returns {Promise<{ user: UserResponse, attempts: number }>} Object with user data 
 * and the number of attempts 
 */
function getUserFemaleWithoutAsyncAwait(): Promise<{ user: UserResponse, attempts: number }> {
    // Counter of the number of attempts
    let attemptCounter = 0;
    // The maximum number of attempts allowed to avoid an eternal loop
    const maxNumberOfRequests = 100;

    return new Promise((resolve, reject) => {
        // Function to get a female user
        const getUserFemale = async () => {
            // An object that stores user data
            let user: UserResponse | null = null;
            // Until the maximum number of attempts is reached and a female user is not found
            while (attemptCounter < maxNumberOfRequests && (!user || user.gender !== 'Female')) {
                try {
                    // makes a request to the ipify API
                    const response = await fetch(randomUserApiURL);
                    // Checking whether the response is successful (HTTP code 200-299)
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    // decodes the response in JSON format and processes it as UserResponse
                    user = await response.json() as UserResponse;
                    // Increase the attempt counter
                    attemptCounter++;
                } catch (error) {
                    // Handling of errors that may occur during the operation
                    console.error('Task 2.2.4.1 error:', error);
                }
            }
            // Checking the results and calling the appropriate callback method (resolve or reject)
            if (user && user.gender === 'Female') {
                resolve({ user, attempts: attemptCounter });
            } else {
                reject(new Error('Exceeded maximum attempts or no female user found'));
            }
        };
        // Calling the function to get the female user
        getUserFemale();
    });
}

// Calling the function and outputting the result
getUserFemaleWithoutAsyncAwait().then(result => {
    console.log(`Task 2.2.4.1. Found female user in ${result.attempts} attempts. User:`, result.user);
})


/**
 * Subtask 2.2.4.2
 * Using async/await.
 * @returns {Promise<UserResponse>} Object with user data
 */
async function getUserFemaleWithAsyncAwait(): Promise<{ user: UserResponse | null, attempts: number }> {
    // Counter of the number of attempts
    let attemptCounter = 0;
    // The maximum number of attempts allowed to avoid an eternal loop
    const maxNumberOfRequests = 100;
    try {
        let userData: UserResponse;

        do {
            // Increment the attempt counter
            attemptCounter++;
            // Call the API and get a response
            const response = await fetch(randomUserApiURL);

            // Checking whether the response is successful (HTTP code 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parsing JSON 
            userData = await response.json() as UserResponse;
        } while (userData.gender !== 'Female' && attemptCounter < maxNumberOfRequests);

        if (userData.gender === 'Female') {
            return { user: userData, attempts: attemptCounter };
        } else {
            // If no female user is found within the maximum number of attempts, return null or handle as needed
            console.log('Task 2.2.4.1. Female user not found within the maximum number of attempts.');
            return { user: null, attempts: attemptCounter };
        }
    } catch (error) {
        console.error('Task 2.2.4.2 error:', error);
        throw error;
    }
}

// Calling the function and outputting the result
getUserFemaleWithAsyncAwait().then(result => {
    if (result.user) {
        console.log(`Task 2.2.4.2. Found female user in ${result.attempts} attempts. User:`, result.user);
    }
});


/**
 * Task 2.2.5
 * 
 * There is a function #1 that accepts a callback 
 * that will be called with the parameter == your current ip.
 */

/**
 * Function #1 retrieves the current IP address using an API call
 * and invokes the provided callback with the obtained IP or null in case of an error.
 * 
 * @param {function} callback - Callback function to be invoked with the current IP or null as a parameter.
 * @returns {void}
 */
function function1(callback: (youIP: string | null) => void): void {
    fetch(ipifyApiURL)
        .then((response) => response.json() as Promise<IpifyResponse>)
        .then((data: IpifyResponse) => {
            const youIP: string = data.ip;
            callback(youIP);
        })
        .catch((error) => {
            console.error('Task 2.2.5 Function1 error:', error);
            callback(null);
        });
}

/**
 * Create an escapable function #2 that will use function #1
 * 
 * @returns {Promise<string | null>} - Promise resolving to the current IP or null in case of an error.
 */
function function2(): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
        // We call function #1 and pass the callback
        function1((yourIP: string | null) => {
            if (yourIP !== null) {
                console.log('Task 2.2.5 IP address:', yourIP);
                resolve(yourIP);
            } else {
                console.log('Task 2.2.5 Function2: Unable to retrieve IP address.');
                reject(new Error('Task 2.2.5 Function2: Unable to retrieve IP address.'));
            }
        });
    });
}
// call function2
function2();

/**
 * Task 2.2.6
 * 
 * Function #1 that returns a promise for the current IP address.
 * Utilizes a promise chain for asynchronous code.
 * 
 * @returns {Promise<string>} - A promise with a string representing the current IP.
 */
function func1(): Promise<string> {
    return fetch(ipifyApiURL)
        .then(response => {
            // Checking if the response is successful
            if (!response.ok) {
                throw new Error(`Failed to fetch IP address. Status: ${response.status}`);
            }
            // Parsing JSON and returning the IP address
            return response.json() as Promise<IpifyResponse>;
        })
        .then((data: IpifyResponse) => {
            return data.ip;
        })
        // Handling errors and logging error information
        .catch(error => {
            console.error('Error:', error.message);
            throw error;
        });
}

/**
 * Function #2 that utilizes Function #1 to retrieve the IP address and
 * calls the provided callback with the obtained IP.
 * 
 * @param {function} callbackFunction - Callback function to be invoked with the IP address as a parameter.
 * @returns {Promise<void>} - Does not return a specific value
 */
async function func2(callbackFunction: (ipAddress: string) => void): Promise<void> {
    try {
        // Calling Function #1 to obtain the IP address
        const currentIP = await func1();
        // Invoking the callback with the found IP address
        callbackFunction(currentIP);
    } catch (error) {
        // Handling errors and logging error information
        console.error('Error:', error);
    }
}

/**
 * A callback function that outputs the received IP address to the console.
 *
 * @param {string} ipAddress - The obtained IP address.
 * @returns {void} - The function does not return a value.
 */
const myCallbackFunction = (ipAddress: string): void => {
    console.log(`Task 2.2.6 IP address: ${ipAddress}`);
};

// Calling func2 with the passing of a callback function
func2(myCallbackFunction);