export interface CameraInterface {
  view: string;
  isRecording: boolean
}

export interface RawCameraInterface {
  isRecording: boolean
  view: string;
}

export interface RawCameraResponse {
  data: RawCameraInterface[]
}
