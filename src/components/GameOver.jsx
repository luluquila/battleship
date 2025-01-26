function GameOver({didPlayerWin}) {

    const message = didPlayerWin ? 'You win!' : 'You lose!';

    return (
        <div>
            {message};
        </div>

    );
}