

    // User ---------------------------------------------------------------------------------------------
    // Add User JS --------------------------------------------------------------------
    const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
            addUserForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const payload = {
                username: data.username,
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                userRole: data.userRole,
                userStatus: data.userStatus,
                password: data.password,
            };

            alert(JSON.stringify(payload))

            try {
                const response = await fetch('/users/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getCookie('access_token')}`
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    window.location.href = '/users/user-page'; // Redirect to the asset page
                    //form.reset(); // Clear the form
                } else {
                    // Handle error
                    const errorData = await response.json();
                    alert(`Error User ADD: ${response.status}:${response.statusText}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('#1xx An error occurred. Please try again.');
            }
        });
    }


    // Edit user JS  --------------------------------------------------------------------
    const editUserForm = document.getElementById('editUserForm');
    if (editUserForm) {
        editUserForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            var url = window.location.pathname;
            const userId = url.substring(url.lastIndexOf('/') + 1);

            const payload = {
                username: data.username,
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                userRole: data.userRole,
                userStatus: data.userStatus,
            };

            alert(JSON.stringify(payload));

            try {
                const token = getCookie('access_token');
                console.log(token)
                if (!token) {
                    throw new Error('Authentication token not found');
                }

                const response = await fetch(`/users/user/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    window.location.href = '/users/user-page'; // Redirect to the user pag
                } else {
                    // Handle error
                    const errorData = await response.json();
                    alert(`Error User UPDATE: ${response.status}:${response.statusText}`);
                }
            } catch (error) {
                alert('`Error User UPDATE:#2 An error occurred. Please try again.');
            }
        });

    }

    // password user JS  --------------------------------------------------------------------
    const passwordUserForm = document.getElementById('passwordUserForm');
    if (passwordUserForm) {
        passwordUserForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            var url = window.location.pathname;
            const userId = url.substring(url.lastIndexOf('/') + 1);

            const payload = {
                password: data.password
            };

            try {
                const token = getCookie('access_token');
                console.log(token)
                if (!token) {
                    throw new Error('Authentication token not found');
                }

                const response = await fetch(`/users/password/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });

                //alert(JSON.stringify(payload))

                if (response.ok) {
                    window.location.href = '/users/user-page'; // Redirect to the user pag
                } else {
                    // Handle error
                    const errorData = await response.json();
                    alert(`Error User Password UPDATE: ${response.status}:${response.statusText}`);
                }
            } catch (error) {
                alert('#2 An error occurred. Please try again.');
            }
        });
    }

    // view user JS  --------------------------------------------------------------------
    const viewUserForm = document.getElementById('viewUserForm');
    if (viewUserForm) {
        viewUserForm.addEventListener('submit', async function (event) {  //for future delete button
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            var url = window.location.pathname;
            const userId = url.substring(url.lastIndexOf('/') + 1);

            const payload = {
                username: data.username,
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                userRole: data.userRole,
                userStatus: data.userStatus
            };

            //alert(JSON.stringify(payload));

            try {
                const token = getCookie('access_token');
                if (!token) {
                    throw new Error('Authentication token not found');
                }

                if (!confirm("Delete User! Are you sure?")) {
                    window.location.href = '/assets/asset-page'; // Redirect to the asset page
                }

                const response = await fetch(`/users/user/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    // Handle success
                    window.location.href = '/users/user-page'; // Redirect to the user page
                } else {
                    // Handle error
                    const errorData = await response.json();
                    alert(`Error user DELTET: ${response.status}:${response.statusText}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Asset ---------------------------------------------------------------------------------------------
    // Add Asset JS --------------------------------------------------------------------
    const addAssetForm = document.getElementById('addAssetForm');
    if (addAssetForm) {
        addAssetForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const payload = {
                majorArea: data.majorArea,
                minorArea: data.minorArea,
                microArea: data.microArea,
                assetType: data.assetType,
                description: data.description,
                assetState: data.assetState
            };

            try {
                const response = await fetch('/assets/asset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getCookie('access_token')}`
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    window.location.href = '/assets/asset-page'; // Redirect to the asset page
                    //form.reset(); // Clear the form
                } else {
                    // Handle error
                    const errorData = await response.json();
                    alert(`XXX Error: ${errorData.detail}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('#1 An error occurred. Please try again.');
            }
        });
    }

    // Edit asset JS  --------------------------------------------------------------------
    const editAssetForm = document.getElementById('editAssetForm');
    if (editAssetForm) {
        editAssetForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            var url = window.location.pathname;
            const assetId = url.substring(url.lastIndexOf('/') + 1);

            const payload = {
                majorArea: data.majorArea,
                minorArea: data.minorArea,
                microArea: data.microArea,
                assetType: data.assetType,
                description: data.description,
                assetState: data.assetState
            };

            try {
                const token = getCookie('access_token');
                console.log(token)
                if (!token) {
                    throw new Error('Authentication token not found');
                }

                console.log(`${assetId}`)
                //alert(`${assetId}`);
                //alert(data.majorArea);
                //alert(data.minorArea);
                //alert(data.microArea);

                const response = await fetch(`/assets/asset/${assetId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });


                if (response.ok) {
                    window.location.href = '/assets/asset-page'; // Redirect to the asset page
                } else {

                    // Handle error
                    const errorData = await response.json();
                    alert(`Error: ${errorData.detail}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('#2 An error occurred. Please try again.');
            }
        });

    }

    // view asset JS  --------------------------------------------------------------------
    const viewAssetForm = document.getElementById('viewAssetForm');
    if (viewAssetForm) {
            viewAssetForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            var url = window.location.pathname;
            const assetId = url.substring(url.lastIndexOf('/') + 1);

            const payload = {
                majorArea: data.majorArea,
                minorArea: data.minorArea,
                microArea: data.microArea,
                assetType: data.assetType,
                description: data.description,
                assetState: data.assetState
            };

            try {
                const token = getCookie('access_token');
                console.log(token)
                if (!token) {
                    throw new Error('Authentication token not found');
                }

                console.log(`${assetId}`)

                if (!confirm("Delete Asset! This will delete all todo for the Asset too!  Are you sure?")) {
                    window.location.href = '/assets/asset-page'; // Redirect to the asset page
                }

                if (!confirm("Delete Asset! Really Sure?")) {
                    window.location.href = '/assets/asset-page'; // Redirect to the asset page
                }

                const response = await fetch(`/assets/asset/${assetId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    window.location.href = '/assets/asset-page'; // Redirect to the asset page
                } else {
                    // Handle error
                    const errorData = await response.json();
                    alert(`Error: ${errorData.detail}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('#2 An error occurred. Please try again.');
            }
        });
    }

    // Todo ---------------------------------------------------------------------------------------------
    // Add Todo JS --------------------------------------------------------------------
    const addTodoForm = document.getElementById('addTodoForm');
    if (addTodoForm) {
        addTodoForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            var url = window.location.pathname;
            const assetId = url.substring(url.lastIndexOf('/') + 1);

            const payload = {
                title: data.title,
                description: data.description,
                priority: data.priority,
                todoStatus: data.todoStatus
            };

            try {
                const token = getCookie('access_token');
                console.log(token)

                if (!token) {
                    throw new Error('Authentication token not found');
                }

                console.log(`${assetId}`)

                const response = await fetch(`/todos/todo-add/${assetId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });

                //alert(data.redirect);
                //alert(assetId);
                //alert(JSON.stringify(payload))

                if (response.ok) {
                    if (data.redirect == 'T')
                        window.location.href = '/todos/todo-page'; // Redirect to the todo page
                    else
                        window.location.href = `/assets/view-asset-page/${assetId}`; // Redirect to the view-asset page
                    //form.reset(); // Clear the form
                } else {
                    // Handle error
                    const errorData = await response.json();
                    alert(`#2 Error: ${errorData.detail}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('#3 An error occurred. Please try again.');
            }
        });
    }

    // Edit Todo JS  --------------------------------------------------------------------
    const editTodoForm = document.getElementById('editTodoForm');
    if (editTodoForm) {
        editTodoForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            var url = window.location.pathname;
            const todoId = url.substring(url.lastIndexOf('/') + 1);

            const payload = {
                title: data.title,
                description: data.description,
                priority: data.priority,
                todoStatus: data.todoStatus
            };

                console.log(`${todoId}`)
                console.log(`${data.assetId}`)
                //alert(`${todoId}`);
                //alert(data.redirect);
                //alert(data.mode);
                //alert(JSON.stringify(payload));
                //alert(data.title);
                //alert(data.description);
                //alert(data.priority);
                //alert(data.todoStatus);

            try {
                const token = getCookie('access_token');
                console.log(token)

                if (!token) {
                    throw new Error('Authentication token not found');
                }


                const response = await fetch(`/todos/todo-update/${todoId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    if (data.redirect == 'T')
                        window.location.href = '/todos/todo-page'; // Redirect to the todo page
                    else {
                        window.location.href = `/assets/view-asset-page/${data.assetId}`; // Redirect to the todo page
                    }
                } else {
                    // Handle error
                    const errorData = await response.json();
                    alert(`#2 Error: ${errorData.detail}`);
                }
            } catch (error) {
                alert(error)
                alert('#3 An error occurred. Please try again.');
                console.error('Error:', error);
            }
        });
    }

    // view todo JS  --------------------------------------------------------------------
    const viewTodoForm = document.getElementById('viewTodoForm');
    if (viewTodoForm) {
        viewTodoForm.addEventListener('submit', async function (event) {  //delete
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            var url = window.location.pathname;
            const todoId = url.substring(url.lastIndexOf('/') + 1);

            const payload = {
                title: data.title,
                description: data.description,
                priority: data.priority,
                todoStatus: data.todoStatus
            };

            try {
                const token = getCookie('access_token');
                console.log(token)
                if (!token) {
                    throw new Error('Authentication token not found');
                }

                console.log(`${todoId}`
                )

                if (!confirm("Delete Todo! Are you sure?")) {
                    window.location.href = '/todos/todo-page'; // Redirect to the todo page
                }

                const response = await fetch(`/todos/todo-delete/${todoId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    if (data.redirect == 'T')
                        window.location.href = '/todos/todo-page'; // Redirect to the todo page
                    else {
                        window.location.href = `/assets/view-asset-page/${data.assetId}`; // Redirect to the todo page
                    }
                } else {
                    // Handle error
                    const errorData = await response.json();
                    alert(`Error: ${errorData.detail}`);
                }
            } catch (error) {
                alert(error)
                console.error('Error:', error);
                alert('#2 An error occurred. Please try again.');
            }
        });
    }

    // Login JS
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);

            const payload = new URLSearchParams();
            for (const [key, value] of formData.entries()) {
                payload.append(key, value);
            }

            try {
                const response = await fetch('/auth/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: payload.toString()
                });

                if (response.ok) {
                    // Handle success (e.g., redirect to dashboard)
                    const data = await response.json();
                    // Delete any cookies available
                    logout();
                    // Save token to cookie
                    document.cookie = `access_token=${data.access_token}; path=/`;

                    window.location.href = '/assets/asset-page'; // Change this to your desired redirect page
                    // window.location.href = '/todos/todo-page'; // Change this to your desired redirect page
                } else {
                    // Handle error
                    const errorData = await response.json();
                    alert(`Error: ${errorData.detail}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('#4 An error occurred. Please try again.');
            }
        });
    }

    // Helper function to get a cookie by name
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    function logout() {
        // Get all cookies
        const cookies = document.cookie.split(";");
    
        // Iterate through all cookies and delete each one
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            // Set the cookie's expiry date to a past date to delete it
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    
        // Redirect to the login page
        window.location.href = '/auth/login-page';
    };


