import SpeedLogApi from './SpeedLogApi'

class ApiLobby {
  readonly speedlog = SpeedLogApi.INSTANCE
}

const Api = new ApiLobby()
export default Api
