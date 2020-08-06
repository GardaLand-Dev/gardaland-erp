enum Environments {
  dev_environment = 'dev',
  prod_environment = 'prod',
  local_environment = 'local',
}

class Environment {
  private environment: string;

  constructor(environment: string) {
    this.environment = environment;
  }

  // getPort(): number {}

  // eslint-disable-next-line consistent-return
  getDBName(): string {
    if (this.environment === Environments.dev_environment) return 'db_dev';
    if (this.environment === Environments.prod_environment) return 'db_prod';
    return 'db_local';
  }
}

export default new Environment(Environments.local_environment);
