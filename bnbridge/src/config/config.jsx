import development from "./development.config";
import example from "./example.config";
import production from "./production.config";
// const env = process.env.APP_ENV || 'development';
const env = 'development';

const config = {
  example,
  development,
  production
};

export default config[env];
