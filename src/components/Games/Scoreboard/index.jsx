import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Close as CloseIcon,
  EmojiEvents as Trophy,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import Button from '../../../components/common/Button';
import {
  getScores,
  getGameStats,
  clearScoreboard,
  formatTime,
  formatDate,
} from '../../../helpers/scoreboard';
import './styles.scss';

const Scoreboard = ({ open, onClose }) => {
  const [scores, setScores] = useState([]);
  const [stats, setStats] = useState({});

  const addDummyScores = useCallback(() => {
    const dummyScores = [
      {
        id: 'dummy-1',
        score: 4096,
        moves: 230,
        time: 480,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
        won: true,
      },
      {
        id: 'dummy-2',
        score: 2048,
        moves: 180,
        time: 320,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        won: true,
      },
      {
        id: 'dummy-3',
        score: 1536,
        moves: 250,
        time: 420,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        won: false,
      },
      {
        id: 'dummy-4',
        score: 1024,
        moves: 200,
        time: 380,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
        won: false,
      },
      {
        id: 'dummy-5',
        score: 512,
        moves: 150,
        time: 280,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        won: false,
      },
      {
        id: 'dummy-6',
        score: 256,
        moves: 120,
        time: 240,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
        won: false,
      },
      {
        id: 'dummy-7',
        score: 128,
        moves: 80,
        time: 180,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        won: false,
      },
    ];

    localStorage.setItem('2048-scoreboard', JSON.stringify(dummyScores));
  }, []);

  const loadData = useCallback(() => {
    let scores = getScores();

    if (scores.length === 0) {
      addDummyScores();
      scores = getScores();
    }

    setScores(scores);
    setStats(getGameStats());
  }, [addDummyScores]);

  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open, loadData]);

  const handleClearScoreboard = useCallback(() => {
    if (
      window.confirm('Are you sure you want to clear all scores? This action cannot be undone.')
    ) {
      clearScoreboard();
      loadData();
    }
  }, [loadData]);

  const getRankIcon = index => {
    switch (index) {
      case 0:
        return <Trophy sx={{ color: '#FFD700', fontSize: 20 }} />;
      case 1:
        return <Trophy sx={{ color: '#C0C0C0', fontSize: 20 }} />;
      case 2:
        return <Trophy sx={{ color: '#CD7F32', fontSize: 20 }} />;
      default:
        return <span className='rank-number'>{index + 1}</span>;
    }
  };

  const getScoreColor = score => {
    if (score >= 2048) return 'success';
    if (score >= 1024) return 'warning';
    if (score >= 512) return 'info';
    return 'default';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth className='scoreboard-dialog'>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h4' component='h2'>
            🏆 2048 Scoreboard
          </Typography>
          <IconButton
            onClick={onClose}
            size='large'
            className='close-button'
            sx={{
              color: 'var(--color-background-text)',
              opacity: 0.8,
              '&:hover': {
                backgroundColor: 'var(--color-neutral-200)',
                opacity: 1,
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent className='scoreboard-content'>
        {scores.length === 0 ? (
          <Box textAlign='center' py={4}>
            <Typography
              variant='h6'
              sx={{
                color: 'var(--color-background-text)',
                opacity: 0.7,
              }}
            >
              No games played yet!
            </Typography>
            <Typography
              variant='body2'
              sx={{
                color: 'var(--color-background-text)',
                opacity: 0.6,
                mt: 1,
              }}
            >
              Start playing to see your scores here.
            </Typography>
          </Box>
        ) : (
          <>
            {/* Game Statistics */}
            <Box mb={3}>
              <Typography variant='h6' gutterBottom>
                📊 Game Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card className='stat-card'>
                    <CardContent>
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'var(--color-background-text)',
                          opacity: 0.7,
                        }}
                      >
                        Total Games
                      </Typography>
                      <Typography variant='h6'>{stats.totalGames}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card className='stat-card'>
                    <CardContent>
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'var(--color-background-text)',
                          opacity: 0.7,
                        }}
                      >
                        Win Rate
                      </Typography>
                      <Typography variant='h6'>{stats.winRate}%</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card className='stat-card'>
                    <CardContent>
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'var(--color-background-text)',
                          opacity: 0.7,
                        }}
                      >
                        Best Score
                      </Typography>
                      <Typography variant='h6'>{stats.bestScore?.toLocaleString()}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card className='stat-card'>
                    <CardContent>
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'var(--color-background-text)',
                          opacity: 0.7,
                        }}
                      >
                        Avg Score
                      </Typography>
                      <Typography variant='h6'>{stats.averageScore?.toLocaleString()}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* High Scores Table */}
            <Box mb={2}>
              <Typography variant='h6' gutterBottom>
                🎯 High Scores
              </Typography>
            </Box>

            <TableContainer component={Paper} className='scores-table'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Moves</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.map((score, index) => (
                    <TableRow
                      key={score.id}
                      className={`score-row ${index < 3 ? 'top-score' : ''}`}
                    >
                      <TableCell>
                        <Box display='flex' alignItems='center' gap={1}>
                          {getRankIcon(index)}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={score.score.toLocaleString()}
                          color={getScoreColor(score.score)}
                          variant='filled'
                          size='small'
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>{score.moves}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>{formatTime(score.time)}</Typography>
                      </TableCell>
                      <TableCell>
                        {score.won ? (
                          <Chip label='Won' color='success' size='small' />
                        ) : (
                          <Chip label='Game Over' color='default' size='small' />
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body2'
                          sx={{
                            color: 'var(--color-background-text)',
                            opacity: 0.7,
                          }}
                        >
                          {formatDate(score.date)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </DialogContent>

      <DialogActions className='scoreboard-actions'>
        {scores.length > 0 && (
          <Tooltip title='Clear all scores'>
            <Button
              onClick={handleClearScoreboard}
              className='clear-btn'
              startIcon={<DeleteIcon />}
              variant='error'
              size='medium'
              sound={true}
            >
              Clear Scores
            </Button>
          </Tooltip>
        )}
        <Button
          onClick={onClose}
          className='close-btn'
          variant='neutral'
          size='medium'
          sound={true}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Scoreboard;
