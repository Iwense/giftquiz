import React,{useState} from 'react';
import {lighten, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarFillIcon from '@material-ui/icons/StarOutlined';
import StarOutlineIcon from '@material-ui/icons/StarBorderOutlined';
import BorderLinearProgress from '@material-ui/core/LinearProgress'
import './QuestionPanel.css';


const useStyles = makeStyles({
  root: {
    width: '100%',
    // minHeight:350,
    // maxHeight:400,
    textAlign:'left',
    paddingBottom: 24,
  },
  questionWrapper:{
    display: 'flex',
    flexDirection: 'column'
  },
  noMargin:{
    margin:0
  },
  button: {
    width: '100%',
    margin: '4px 0px'
  },
  question:{
    color:'black',
    fontSize: '20px',
    fontWeight:600,
  },
  progressRoot: {
    height: 10,
    backgroundColor: lighten('#ff6c5c', 0.5),
    borderRadius: 20,

  },
  bar: {
    height: 16,
    borderRadius: 20,
  },
  score:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
}, {index: 3});

export default function QuestionPanel({question, nextQuestion, total, questionNo, progress, checkUserAnswer,maxScore, score}) {
  const [answered,setAnswered] = useState('');
  const [message,setMessage]=useState(''); 
  const classes = useStyles();
  
  const handleAnswer = (ans) =>{
    setAnswered(ans);
    checkUserAnswer(ans);
    if(decodeURIComponent(question['correct_answer'])==ans){
      setMessage('Верно!')
    }
    else{
      setMessage('Упс, неверно!')
    }
  }

  
  return (<>
        <div className={classes.progressRoot}>

          <BorderLinearProgress
              className={classes.bar}
              variant="determinate"
              color="secondary"
              value={progress}
            />
        </div>

        <Card className={classes.root}>
          <CardActionArea>  
            <CardContent>
              <Typography variant="h5" component="h3">
                Вопрос {questionNo} из {total}
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                {decodeURIComponent(question['category'])}
              </Typography>
              <Divider/>
              <Typography  variant="body1" color="textSecondary" component="p" className={classes.question}>
                {decodeURIComponent(question['question'])}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions 
          disableSpacing={true}
          className={classes.questionWrapper}>
            { question['incorrect_answers'].map(key =>
                <Button className={classes.button}
                        variant={answered === decodeURIComponent(key)? "contained" :"outlined"} 
                        color="primary" key={decodeURIComponent(key)} 
                        onClick={()=>handleAnswer(decodeURIComponent(key))}
                        disabled={answered!==''?true : false}
                >
                        {decodeURIComponent(key)}
                </Button>
              )
            }
          </CardActions>
          
          
          <Typography variant="h5" component="h5" className="message">
              {answered && message}
          </Typography>
            
          {answered!=='' && progress !==100? 
            <Button variant="contained" 
              className="next-button" 
              color="secondary" key="next" onClick={()=>{nextQuestion(); setAnswered('');}} 
              >
                Следующий вопрос
          </Button>
          
          : ''}
            

        </Card>
          <div className={classes.score}>
            {questionNo !== 20 ? (
              <p>Верные ответы: {score} / {questionNo-1} </p>
            ) : (
              <p>Верные ответы: {score} / {questionNo} </p>
            )
          }
            
          </div>
        

    </>
  );
}