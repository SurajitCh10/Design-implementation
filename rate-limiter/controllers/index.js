let remainingCounter = 1000; // suppose this is the number of requests available

class VideoStreamer {
  validator = (req, res, next) => {
    next();
  };

  video = () => {
    return "controlled video stream";
  };

  getVideo = (req, res) => {
    let video = this.video();
    remainingCounter -= 1; // decrement the counter
    res.status(200).send({
      message: `Remaining count for video is ${remainingCounter}`,
      video,
    });
  };
}

export default new VideoStreamer();
