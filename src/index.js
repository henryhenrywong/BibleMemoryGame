import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const BOOKS = [
  'Genesis',         'Exodus',          'Leviticus',     'Numbers',
  'Deuteronomy',     'Joshua',          'Judges',        'Ruth',
  '1 Samuel',        '2 Samuel',        '1 Kings',       '2 Kings',
  '1 Chronicles',    '2 Chronicles',    'Ezra',          'Nehemiah',
  'Esther',          'Job',             'Psalm',         'Proverbs',
  'Ecclesiastes',    'Song of Solomon', 'Isaiah',        'Jeremiah',
  'Lamentations',    'Ezekiel',         'Daniel',        'Hosea',
  'Joel',            'Amos',            'Obadiah',       'Jonah',
  'Micah',           'Nahum',           'Habakkuk',      'Zephaniah',
  'Haggai',          'Zechariah',       'Malachi',       'Matthew',
  'Mark',            'Luke',            'John',          'Acts',
  'Romans',          '1 Corinthians',   '2 Corinthians', 'Galatians',
  'Ephesians',       'Philippians',     'Colossians',    '1 Thessalonians', 
  '2 Thessalonians', '1 Timothy',       '2 Timothy',     'Titus',
  'Philemon',        'Hebrews',         'James',         '1 Peter',
  '2 Peter',         '1 John',          '2 John',        '3 John',
  'Jude',            'Revelation'
];
const CHAPTERS = [
  50,40,27,36,34,24,21,4,31,24,22,25,29,36,10,13,10,42,150,31,12,8,66,52,5,48,12,14,3,9,1,4,7,3,3,3,2,14,4,28,16,24,21,28,16,16,13,6,6,4,4,5,3,6,4,3,1,13,5,5,3,5,1,1,1,22
];
const API_KEY = '0402340e34b07c64d6bac913ac50639b6decb1fc'
const API_URL = 'https://api.esv.org/v3/passage/text/'
const NUMBEROFVERSESBYBOOK = {
  'Genesis' : [31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,54,33,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26],
  'Exodus' : [22,25,22,31,23,30,29,28,35,29,10,51,22,31,27,36,16,27,25,26,37,30,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38],
  'Leviticus' : [17,16,17,35,26,23,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34],
  'Numbers' : [54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,35,28,32,22,29,35,41,30,25,18,65,23,31,39,17,54,42,56,29,34,13],
  'Deuteronomy': [46,37,29,49,33,25,26,20,29,22,32,31,19,29,23,22,20,22,21,20,23,29,26,22,19,19,26,69,28,20,30,52,29,12],
  'Joshua': [18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33],
  'Judges': [36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25],        'Ruth': [22,23,18,22],
  '1 Samuel': [28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,16,23,28,23,43,25,12,25,11,31,13],        
  '2 Samuel': [27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,32,44,26,22,51,39,25],        
  '1 Kings': [53,46,28,20,32,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,54],       
  '2 Kings': [18,25,27,44,27,33,20,29,37,36,20,22,25,29,38,20,41,37,37,21,26,20,37,20,30],
  '1 Chronicles': [54,55,24,43,41,66,40,40,44,14,47,41,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30],    
  '2 Chronicles': [18,17,17,22,14,42,22,18,31,19,23,16,23,14,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,26,23],    'Ezra': [11,70,13,24,17,22,28,36,15,44],          
  'Nehemiah': [11,20,38,17,19,19,72,18,37,40,36,47,31],
  'Esther': [22,23,15,17,14,14,10,17,32,3,17,8,30,16,24,10],          
  'Job': [22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,21,28,25,31,40,22,33,37,16,33,24,41,30,32,26,17],             
  'Psalm': [6,12,9,9,13,11,18,10,21,18,7,9,6,7,5,11,15,51,15,10,14,32,6,10,22,11,14,9,11,13,25,11,22,23,28,13,40,23,14,18,14,12,5,27,18,12,10,15,21,23,21,11,7,9,24,14,12,12,
    18,14,9,13,12,11,14,20,8,36,37,6,24,20,28,23,11,13,21,72,13,20,17,8,19,13,14,17,7,19,53,17,16,16,5,23,11,13,12,9,9,5,8,29,22,35,45,48,43,14,31,7,10,10,9,8,18,19,2,29,176,
    7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,14,10,8,12,15,21,10,20,14,9,6],         
  'Proverbs': [33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31],
  'Ecclesiastes': [18,26,22,17,19,12,29,17,18,20,10,14],    'Song of Solomon': [17,17,11,16,16,12,14,14], 
  'Isaiah': [31,22,26,6,30,13,25,23,20,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,
    21,14,21,22,11,12,19,11,25,24],        
  'Jeremiah': [19,37,25,31,31,30,34,23,25,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34],
  'Lamentations': [22,22,66,22,22],    
  'Ezekiel': [28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,44,37,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35],         
  'Daniel': [21,49,100,34,30,29,28,27,27,21,45,13,64,42],        'Hosea': [9,25,5,19,15,11,16,14,17,15,11,15,15,10],
  'Joel': [20,27,5,21],            'Amos': [15,16,15,13,27,14,17,14,15],            'Obadiah': [21],       'Jonah': [16,11,10,11],
  'Micah': [16,13,12,14,14,16,20],           'Nahum': [14,14,19],           'Habakkuk': [17,20,19],      'Zephaniah': [18,15,20],
  'Haggai': [15,23],          'Zechariah': [17,17,10,14,11,15,14,23,17,12,17,14,9,21],       'Malachi': [14,17,24],       
  'Matthew': [25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20],
  'Mark': [45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20],            'Luke': [80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53],            
  'John': [51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25],          'Acts': [26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31],
  'Romans': [32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27],          '1 Corinthians': [31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24],   
  '2 Corinthians': [24,17,18,18,21,18,16,24,15,18,33,21,13], 'Galatians': [24,21,29,31,26,18],
  'Ephesians': [23,22,21,32,33,24],       'Philippians': [30,30,21,23],     'Colossians': [29,23,25,18],    '1 Thessalonians': [10,20,13,18,28], 
  '2 Thessalonians': [12,17,18], '1 Timothy': [20,15,16,16,25,21],       '2 Timothy': [18,26,17,22],     'Titus': [16,15,15],
  'Philemon': [25],        'Hebrews': [14,18,19,16,14,20,28,13,28,39,40,29,25],         'James': [27,26,18,17,20],         '1 Peter': [25,25,22,19,14],
  '2 Peter': [21,22,18],         '1 John': [10,29,24,21,21],          '2 John': [13],        '3 John': [15],
  'Jude': [25],            'Revelation': [20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21]


}



class PassageSelect extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      book: 0,
      chapter: 0,
      verse:0,
      secondverse:0,
      passage: null,
      wordCounter: 0, 
      leftWord: "FILLER",
      rightWord: "FILLER",
      leftTruth: null,
      rightTruth: null,
      trackerLength: null
    };

    this.handleBookChange = this.handleBookChange.bind(this);
    this.handleChapterChange = this.handleChapterChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleVerseChange = this.handleVerseChange.bind(this);
    this.handleSecondVerseChange = this.handleSecondVerseChange.bind(this);
    this.leftPress = this.leftPress.bind(this);
    this.rightPress = this.rightPress.bind(this);
    this.handleRetry = this.handleRetry.bind(this);
  }
  handleBookChange(e) {
    this.setState({ book: e.target.value });
    if(CHAPTERS[e.target.value] < this.state.chapter){
      this.setState({ chapter: 0 });
    }
  }
  handleChapterChange(e) {
    this.setState({ chapter: e.target.value });
    if(NUMBEROFVERSESBYBOOK[BOOKS[this.state.book]][e.target.value] < this.state.verse){
      this.setState({ verse: 0 });
    }
  }
  handleVerseChange(e) {
    this.setState({ verse: e.target.value });
  }
  handleSecondVerseChange(e) {
    this.setState({ secondverse: e.target.value });
  }
  handleRetry(){
    let randWord = COMMONWORDS[getRandomInt(COMMONWORDS.length)]
    
    if(this.state.passage == null) return
    this.setState({wordCounter:0})
    if(Math.random > 0.5){
      this.setState({leftWord:this.state.passage[0],rightWord:randWord,leftTruth:true,rightTruth:false})
    }else{
      this.setState({leftWord:randWord,rightWord:this.state.passage[0],leftTruth:false,rightTruth:true})
    }
  }
  leftPress(){
    let randWord = COMMONWORDS[getRandomInt(COMMONWORDS.length)]
    if(!!this.state.leftTruth === true){
      if(Math.random() > 0.5){
        this.setState({leftWord:this.state.passage[this.state.wordCounter+1],rightWord:randWord,leftTruth:true,rightTruth:false})
      }else{
        this.setState({leftWord:randWord,rightWord:this.state.passage[this.state.wordCounter+1],leftTruth:false,rightTruth:true})
      }
      this.setState({ wordCounter: this.state.wordCounter+1 });   
    }else{
      this.setState({leftWord:"GAME",rightWord:"OVER",leftTruth:false,rightTruth:false})
    }
    
  }
  rightPress(){
    let randWord = COMMONWORDS[getRandomInt(COMMONWORDS.length)]
    if(!!this.state.rightTruth === true){
      if(Math.random() > 0.5){
        this.setState({leftWord:this.state.passage[this.state.wordCounter+1],rightWord:randWord,leftTruth:true,rightTruth:false})
      }else{
        this.setState({leftWord:randWord,rightWord:this.state.passage[this.state.wordCounter+1],leftTruth:false,rightTruth:true})
      }
      this.setState({ wordCounter: this.state.wordCounter+1 });
    }else{
      this.setState({leftWord:"GAME",rightWord:"OVER",leftTruth:false,rightTruth:false})
    }
    
  }
  handleStart(){
    console.log(BOOKS[this.state.book],parseInt(this.state.chapter)+1,parseInt(this.state.verse)+1)
    let randWord = COMMONWORDS[getRandomInt(COMMONWORDS.length)]
    fetch(API_URL +"?"+ new URLSearchParams({
      'q': BOOKS[this.state.book] +" "+ parseInt(parseInt(this.state.chapter)+1)+":"+parseInt(parseInt(this.state.verse)+1)+"-"+parseInt(parseInt(this.state.secondverse)+1),
      'include-headings': 'False',
      'include-footnotes': 'False',
      'include-verse-numbers': 'False',
      'include-short-copyright': 'False',
      'include-passage-references': 'False'
    }), { 
      headers: new Headers({
        'Authorization': 'Token ' + API_KEY
      }), 
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data.passages)
      let passage = data.passages[0].replace(/\r?\n|\r/g, "").split(" ").filter(e=>e)
      this.setState({passage: passage,trackerLength:passage.length})
      if(Math.random > 0.5){
        this.setState({leftWord:passage[0],rightWord:randWord,leftTruth:true,rightTruth:false})
      }else{
        this.setState({leftWord:randWord,rightWord:passage[0],leftTruth:false,rightTruth:true})
      }
    });
  }
  render(){
    //console.log("bookindex",this.state.book,"chapter",this.state.chapter,"numChapter",chapters[this.state.book])
    var numChapter = (CHAPTERS[this.state.book]);
    var numVerse = NUMBEROFVERSESBYBOOK[BOOKS[this.state.book]][this.state.chapter] 
    
    return(
      
      <div>
        <select onChange={this.handleBookChange}>
          {BOOKS.map(function (i,index) {
            return <option key={i} value={index}>{i}</option>;
          })}
        </select>
        <select onChange={this.handleChapterChange}>
          {[...Array(numChapter).keys()].map(function (i) {
            return <option key={i} value={i}>{i+1}</option>;
          })}
        </select>
        <select onChange={this.handleVerseChange}>
          {[...Array(numVerse).keys()].map(function (i) {
            return <option key={i} value={i}>{i+1}</option>;
          })}
        </select>
        <select onChange={this.handleSecondVerseChange}>
          {[...Array(numVerse).keys()].map(function (i) {
            return <option key={i} value={i}>{i+1}</option>;
          })}
        </select>
        <button onClick={this.handleStart}>Start!</button>
        <button onClick={this.handleRetry}>Retry!</button>
        <div id="tracker">{this.state.wordCounter}/{this.state.trackerLength}</div>
        <div id="leftCard" onClick={this.leftPress}>{this.state.leftWord}</div>
        <div id="rightCard" onClick={this.rightPress}>{this.state.rightWord}</div>
      </div>
      
    )
  }
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="passage-selection">
          <PassageSelect />
        </div>
        <div className="game-board">
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const COMMONWORDS=["and", "the", "of", "that", "to", "in", "he", "for", "unto", "a", "lord", "his", "shall", "i", "they", "not", "be", "is", "them", "with", "him", 
"all", "it", "but", "which", "was", "god", "said", "from", "have", "as", "thy", "their", "my", "me", "will", "when", "are", "this", "were", "out", "upon", "man", "by", 
"then", "up", "israel", "there", "people", "had", "came", "so", "into", "you", "king", "come", "also", "one", "son", "before", "an", "on", "men", "house", "at", "day", 
"children", "now", "against", "if", "made", "land", "no", "we", "her", "go", "went", "saying", "even", "do", "therefore", "things", "hand", "let", "your", "these", 
"behold", "us", "because", "after", "great", "every", "down", "who", "our", "make", "earth", "did", "may", "say", "sons", "away", "what", "has", "over", "or", "give", 
"forth", "put", "among", "any", "neither", "brought", "take", "jerusalem", "city", "jesus", "father", "name", "heart", "days", "she", "took", "david", "am", "should", 
"pass", "good", "set", "according", "sent", "thereof", "two", "whom", "moses", "place", "know", "yet", "time", "thus", "bring", "again", "more", "judah", "word", "like", 
"heard", "called", "about", "nor", "own", "many", "way", "holy", "done", "evil", "see", "heaven", "brethren", "hundred", "words", "eat", "mine", "saw", "spake", "fire", 
"together", "those", "egypt", "himself", "thing", "how", "law", "given", "hear", "fathers", "might", "high", "than", "gave", "art", "cast", "answered", "life", "ever", 
"hands", "other", "speak", "eyes", ,"through", "fear", "off", "commanded", "voice", "christ", "offering", "would", "priest", "three", "spirit", "thousand", "servants", 
"another", "soul", "years", "servant", "themselves", "first", "found", "glory", "without", "peace", "where", "gold", "mouth", "being", "wherefore", "death", "priests", 
"cities", "sword", "both", "sin", "seven", "face", "water", "keep", "sea", "left", "work", "blood", "wife", "wicked", "been", "flesh", "under", "woman", "dead", "none", 
"taken", "much", "old"]