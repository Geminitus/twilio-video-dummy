const { connect, createLocalTracks } = require('twilio-video')

connect('$TOKEN', { name: 'Spanish' }).then(room => {
  console.log(`Successfully joined a Room: ${room}`)
  room.on('participantConnected', participant => {
    console.log(`A remote Participant connected: ${participant}`)
  })
}, error => {
  console.error(`Unable to connect to Room: ${error.message}`)
})

createLocalTracks({
  audio: true,
  video: { width: 640 }
}).then(localTracks => {
  return connect('$TOKEN', {
    name: 'Spanish',
    tracks: localTracks
  })
}).then(room => {
  console.log(`Connected to Room: ${room.name}`)
})

// Log your Client's LocalParticipant in the Room
const localParticipant = room.localParticipant
console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`)

// Log any Participants already connected to the Room
room.participants.forEach(participant => {
  console.log(`Participant "${participant.identity}" is connected to the Room`)
})

// Log new Participants as they connect to the Room
room.once('participantConnected', participant => {
  console.log(`Participant "${participant.identity}" has connected to the Room`)
})

// Log Participants as they disconnect from the Room
room.once('participantDisconnected', participant => {
  console.log(`Participant "${participant.identity}" has disconnected from the Room`)
})

room.on('participantConnected', participant => {
  console.log(`Participant connected: ${participant.identity}`)
})

room.on('participantDisconnected', participant => {
  console.log(`Participant disconnected: ${participant.identity}`)
})

// Attach the Participant's Media to a <div> element.
room.on('participantConnected', participant => {
  console.log(`Participant "${participant.identity}" connected`)

  participant.tracks.forEach(publication => {
    if (publication.isSubscribed) {
      const track = publication.track
      document.getElementById('remote-media-div').appendChild(track.attach())
    }
  })

  participant.on('trackSubscribed', track => {
    document.getElementById('remote-media-div').appendChild(track.attach())
  })
})

room.on('disconnected', room => {
  // Detach the local media elements
  room.localParticipant.tracks.forEach(publication => {
    const attachedElements = publication.track.detach()
    attachedElements.forEach(element => element.remove())
  })
})

// To disconnect from a Room
room.disconnect()
