const tokenStorage = {
  accessToken: null as null | string,
  setAccessToken: function (token: string): void {
    this.accessToken = token;
  },
};

export default tokenStorage;
