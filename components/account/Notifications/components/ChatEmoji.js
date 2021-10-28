import React from 'react';
import EmojiPicker, {SKIN_TONE_NEUTRAL} from 'emoji-picker-react'



const ChatEmoji = ({visible, setInput}) => {

  return (
    <div className='messageChatEmojiContainer'>
      <div className='messageChatEmojiList'
        onMouseLeave={() => visible(false)}
        onMouseEnter={() => visible(true)}
      >
        <div>
          <EmojiPicker
          className='emoji-picker-react'
          onEmojiClick={(e, emojiObject) => {
            console.log(1)
            setInput(prev => `${prev}${emojiObject.emoji}`)
          }}
          groupNames={{
            smileys_people: "Люди",
            animals_nature: 'Животные',
            food_drink: 'Еда',
            travel_places: 'Места',
            activities: 'Развлечения',
            objects: 'Вещи',
            symbols: 'Доп. Вещи',
            flags: 'fun with flags',
            recently_used: 'Использованные',
          }}
          groupVisibility={{
            flags: false,
          }}
          disableAutoFocus
          disableSearchBar
          skinTone={SKIN_TONE_NEUTRAL}
          native
        />
        </div>
        <div style={{userSelect: 'none', width: '20px'}}>&nbsp;</div>
        <div style={{userSelect: 'none', width: '20px'}}>&nbsp;</div>
        <div style={{userSelect: 'none', width: '20px'}}>&nbsp;</div>
      </div>
    </div>
  );
};

export default ChatEmoji;