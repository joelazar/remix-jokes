import { User } from '@prisma/client';
import {
  Link,
  LinksFunction,
  LoaderFunction,
  useLoaderData,
  Form,
} from 'remix';
import { Outlet } from 'remix';
import { getUser } from '~/utils/session.server';
import stylesUrl from '../styles/jokes.css';

export let links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: stylesUrl,
    },
  ];
};

type LoaderData = {
  user: User | null;
};

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);

  let data: LoaderData = {
    user,
  };

  return data;
};

export default function UsersRoute() {
  let data = useLoaderData<LoaderData>();

  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link to="/" title="Remix Jokes" aria-label="Remix Jokes">
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
          {data.user ? (
            <div className="user-info">
              <span>{`Hi ${data.user.username}`}</span>
              <Form action="/logout" method="post">
                <button type="submit" className="button">
                  Logout
                </button>
              </Form>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">Maybe links here?</div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
