/**
 * Application settings
 */
export class AppSettings {

  public static API_ENDPOINT = 'http://127.0.0.1:8080/api/';

  public getApiEndpoint(): string {
    return AppSettings.API_ENDPOINT;
  }

}
