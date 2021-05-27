const defaultElements = [{
    title: 'door',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F1.wav?v=1622104788483',
    tag: 'objects'
}, {
    title: 'shake',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F2.wav?v=1622104787904',
    tag: 'industrial'
}, {
    title: 'window',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F3.wav?v=1622104789996.wav',
    tag: 'objects'
}, {
    title: 'gas',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F4.wav?v=1622104787853',
    tag: 'industrial'
}, {
    title: 'big pan',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F5.wav?v=1622104790383',
    tag: 'kitchen'
}, {
    title: 'annoying bell',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F6.wav?v=1622104791632',
    tag: 'school'
}, {
    title: 'massive fart',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F7.wav?v=1622104788379',
    tag: 'animal'
}, {
    title: 'bell',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F8.wav?v=1622104791836',
    tag: 'house'
}, {
    title: 'dark wind',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F9.wav?v=1622104789488',
    tag: 'nature'
}, {
    title: 'anooying keyboard',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F10.wav?v=1622104790846',
    tag: 'computer'
}, {
    title: 'screaming',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F11.wav?v=1622104792189',
    tag: 'behaviour'
}, {
    title: 'hospital alarm',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F12.wav?v=1622104793119',
    tag: 'hospital'
}, {
    title: 'spoon',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F13.wav?v=1622104791605',
    tag: 'kitchen'
}, {
    title: 'spark',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F17.wav?v=1622104793426',
    tag: 'industrial'
}, {
    title: 'glitch tv',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F14.wav?v=1622104791681',
    tag: 'house'
}, {
    title: 'car accident',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F15.wav?v=1622104792224',
    tag: 'city'
}, {
    title: 'scrub',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F16.wav?v=1622104791979',
    tag: 'behaviour'
}, {
    title: 'swing',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F18.wav?v=1622104792369',
    tag: 'city'
}, {
    title: 'kick-ass',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F19.wav?v=1622104792671',
    tag: 'behaviour'
}, {
    title: 'car bell',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2F20.wav?v=1622104792968',
    tag: 'city'
}, {
    title: 'Metronome Bell',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FEb1.mp3?v=1622104800869',
    tag: 'bell'
}, {
    title: 'Metronome Click',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FE1.mp3?v=1622104799851',
    tag: 'Computer'
}, {
    title: 'Square Click',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FF1.mp3?v=1622104802324',
    tag: 'Computer'
}, {
    title: 'Sticks',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FGb1.mp3?v=1622104805178',
    tag: 'Wood'
}, {
    title: 'Scratch Pull',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FG1.mp3?v=1622104803780',
    tag: 'Human'
}, {
    title: 'Scratch Push',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FAb1.mp3?v=1622104793109',
    tag: 'Human'
}, {
    title: 'Slap',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FA1.mp3?v=1622104792685',
    tag: 'actions'
}, {
    title: 'High Q',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FBb1.mp3?v=1622104795001',
    tag: 'Nature'
}, {
    title: 'Bass Drum',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FB1.mp3?v=1622104793644',
    tag: 'BASS'
}, {
    title: 'Bass Drum',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FC2.mp3?v=1622104796700',
    tag: 'BASS'
}, {
    title: 'Side Stick',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FDb2.mp3?v=1622104798476',
    tag: 'Stick'
}, {
    title: 'NOISY PAN',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FD2.mp3?v=1622104797265',
    tag: 'Kitchen'
}, {
    title: 'HAND CLAP',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FEb2.mp3?v=1622104801127',
    tag: 'Human'
}, {
    title: 'Low Tom',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FG2.mp3?v=1622104804160',
    tag: 'Human'
}, {
    title: 'Chinese Cymbal',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FE3.mp3?v=1622104800062',
    tag: 'International'
}, {
    title: 'Ride Bell',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FF3.mp3?v=1622104803213',
    tag: 'Bell'
}, {
    title: 'BIG Tambourine',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FGb3.mp3?v=1622104805632',
    tag: 'Nature'
} , {
    title: 'Splash Cymbal',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FG3.mp3?v=1622104804415',
    tag: 'Actions'
}, {
    title: 'Cowbell',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FAb3.mp3?v=1622104793258',
    tag: 'Actions'
}, {
    title: 'Cowbell',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FA3.mp3?v=1622104792999',
    tag: 'Animals'
}, {
    title: 'Vibra Slap',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FBb3.mp3?v=1622104795439',
    tag: 'Human'
}, {
    title: 'High Bongo',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FC4.mp3?v=1622104796581',
    tag: 'Bongo'
}, {
    title: 'Low Bongo',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FDb4.mp3?v=1622104799162',
    tag: 'Bongo'
}, {
    title: 'Mute High Conga',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FD4.mp3?v=1622104797723',
    tag: 'Conga'
}, {
    title: 'Open High Conga',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FEb4.mp3?v=1622104801660',
    tag: 'Conga'
}, {
    title: 'High Timbale',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FF4.mp3?v=1622104803264',
    tag: 'Nature'
}, {
    title: 'High Agogô',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FG4.mp3?v=1622104804664',
    tag: 'Nature'
} , {
    title: 'Cabasa',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FA4.mp3?v=1622104792990',
    tag: 'Misc'
}, {
    title: 'Maracas',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FA4.mp3?v=1622104792990',
    tag: 'Misc'
}, {
    title: 'Short Whistle',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FB4.mp3?v=1622104794261',
    tag: 'Misc'
}, {
    title: 'Long Whistle',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FC5.mp3?v=1622104796798',
    tag: 'Misc'
}, {
    title: 'Long Güiro',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FD5.mp3?v=1622104798687',
    tag: 'Misc'
}, {
    title: 'Claves',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FEb5.mp3?v=1622104801853',
    tag: 'Misc'
}, {
    title: 'High Wood Block',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FE5.mp3?v=1622104800634',
    tag: 'Wood'
}, {
    title: 'Open Cuíca',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FG5.mp3?v=1622104804907',
    tag: 'Misc'
}, {
    title: 'Jingle Bell',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FB5.mp3?v=1622104794743',
    tag: 'Bell'
}, {
    title: 'Bell Tree',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FC6.mp3?v=1622104797025',
    tag: 'Bell'
}, {
    title: 'Castanets',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FDb6.mp3?v=1622104799616',
    tag: 'Misc'
}, {
    title: 'Open Surdo',
    destination: 'https://cdn.glitch.com/8db8cbf8-6873-4687-a943-f89c44637faf%2FEb6.mp3?v=1622104802599',
    tag: 'Misc'
}];

export default defaultElements;