export interface Config {
  camera: {
    ISO: number,
    shutter_speed: number
  },
  capture: {
    light_source: number,
    duration: number,
    interval: number,
    output_dir: string,
    sequence_name: string,
    verbose: string,
    resolution: string,
    crop_enabled: string,
    crop: string,
    external_storage: string
  },
  process: {
    processor: string,
    intermediates_enabled: string,
    outlier_removal_enabled: string,
    filtering_enabled: string,
    thresholding_enabled: string,
    difference_enabled: string,
    roi_enabled: string,
    roi: string,
    verbose: string,
    filter_threshold: number
  },
  pi: {
    GPIO_light_channel: number
  }
}