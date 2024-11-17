import { Form, json, redirect } from "react-router-dom";

export default function AuthenaticationPage() {
  return (
    <>
      <section>
        <main className="flex justify-center">
          <div className="card bg-base-100 w-[45%] shadow-xl mt-[5%]">
            <div className="card-body">
              <h2 className="card-title">{"Login Form"}</h2>

              <Form method="post" className="mt-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Type here"
                    defaultValue={''}
                    className="input input-bordered input-primary w-full"
                  />
                </label>
                <label className="form-control w-full mt-[2s%]">
                  <div className="label">
                    <span className="label-text">Password</span>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Type here"
                    className="input input-bordered input-primary w-full"
                  />
                </label>

                <section className="flex justify-ends items-center mt-[5%]">
                  <div className="card-actions ">
                    <button className="btn btn-primary">Login</button>
                  </div>
                </section>
              </Form>

            </div>
          </div>
        </main>
      </section>
    </>
  );
}

export async function action({ request, params }) {

  console.log('REQUEST: ', request);

  const data = await request.formData();
  const eventData = {
    email: data.get('email'),
    password: data.get('password'),
  }
  
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json' 
    }
  });

  if(!response.ok) {
    throw json({ message: 'Could not save event.' }, {status: 500});
  }

  return redirect('/');

}
