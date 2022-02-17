const SUPABASE_URL = 'https://nschbtdnjkjkoshunkhk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zY2hidGRuamtqa29zaHVua2hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ0MzYwMjAsImV4cCI6MTk2MDAxMjAyMH0.mwm25ysgqkbA7ZMQcYTguKcFC-qRnmiDHgK2PxCROPk';
    

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createTodo(todo) {
    const resp = await client.from('todos').insert({ todo });
    return checkError(resp);
    

    
}
export async function deleteAllTodos() {
    const resp = await client.from('todos').delete().match({ user_id: getUser().id }); 
    // delete all todos for this user in supabase

    return checkError(resp);
}

export async function getTodos() {
    const resp = await client.from('todos').select().order('id');
    return checkError(resp);
}

export async function completeTodo(id) {
    const resp = await client.from('todos').update({ complete: true }).match({ id });
    // console.log(resp);
    // find the and update (set complete to true), the todo that matches the correct id

    return checkError(resp);
}

export async function getUser() {
    return client.auth.session();
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../');
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./todos');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
