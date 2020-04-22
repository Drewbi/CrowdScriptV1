const mongoose = require('mongoose')
const Episode = mongoose.model('Episode')
const Segment = mongoose.model('Segment')
const Submission = mongoose.model('Submission')

const getAllEpisodes = async (req, res) => {
  const episodes = await Episode.find()
  return res.status(200).json({ episodes })
}

const createEpisode = async (req, res) => {
  const { number, name, src } = req.body
  const episode = new Episode()
  episode.number = number
  episode.name = name
  episode.src = src
  episode.completed = false

  try {
    const result = await episode.save()
    return res.status(200).json({ result })
  } catch (err) {
    res.status(400).json({ message: 'Error adding episode', error: err })
  }
}

const completeEpisode = async (episodeId) => {
  try {
    const episode = await Episode.findById(episodeId)
    if (episode) {
      episode.completed = true
      episode.save()
    }
  } catch (err) {
    console.log('failed to update episode')
  }
}

const deleteEpisode = async (req, res) => {
  const { number } = req.body
  const episode = await Episode.findOne({ number })
  await Submission.deleteMany({ segment: { $in: episode.segments } })
  await Segment.deleteMany({ episode: episode._id })
  const result = await Episode.deleteOne({ number })
  return result.ok === 1
    ? res.status(200).json({ message: 'Successfully deleted episode' })
    : res.status(400).json({ message: 'Failed to delete episode' })
}

module.exports = { getAllEpisodes, createEpisode, completeEpisode, deleteEpisode }
