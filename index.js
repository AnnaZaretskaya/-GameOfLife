$(document).ready(function() {
    world.updateOptions();
    data.init(world.options);
    world.initRenderTable(world.options);
    world.subscribe();
});

var data = {
    currentMatrix: [],
    nextMatrix:[],

    init: function() {
        for(var i = 0; i < world.options.worldWidth; i++){
            this.currentMatrix[i] = [];
            this.nextMatrix[i] = [];
            for(var j = 0; j < world.options.worldLenght; j++){
                this.currentMatrix[i][j] = 0;
                this.nextMatrix[i][j] = 0;
            }
        }
    }
};

var world = {
    config: {
        table: 'main table',
        startButton: '.start',
        pauseButton: '.pause',
        stopButton: '.stop',
        container: 'main',
        speedInput: 'aside .speed',
        widthInput: 'aside .width',
        lengthInput: 'aside .lenght',
        timerId: 0,
        isRunnung: false
    },

    options: {},

    subscribe: function(){
        $(this.config.startButton).on('click', this.start.bind(this) );
        $(this.config.pauseButton).on('click', this.pause.bind(this) );
        $(this.config.stopButton).on('click', this.stop.bind(this) );
        $(this.config.speedInput).on('change',  function() {
            this.updateOptions();
            if (this.config.isRunnung) {
                window.clearInterval(this.config.timerId);
                this.start();
            }
        }.bind(this) );
        $(this.config.table).on('click', this.handleTableClick.bind(this));
    },

    start: function() {
        this.config.timerId = window.setInterval(this.updateWorld.bind(this), this.options.speed);
        this.config.isRunnung = true;
    },

    pause: function(){
        console.log('world paused');
        window.clearInterval(this.config.timerId);
        this.config.isRunnung = false;
    },

    stop: function(){
        console.log('world stoped');
        window.clearInterval(this.config.timerId);
        data.init();
        this.config.isRunnung = false;
        this.renderMatrix(data.currentMatrix);
    },

    updateOptions: function(){
        this.options.speed = $(this.config.speedInput).val();
        this.options.worldWidth = $(this.config.widthInput).val();
        this.options.worldLenght = $(this.config.lengthInput).val();
        return this.options;
    },

    initRenderTable: function(options) {
        for (var i = 0; i < options.worldWidth; i++) {
            var $tr = $('<tr>');
            $(this.config.table).append($tr);
            for (var j = 0; j < options.worldLenght; j++) {
                var $td = $('<td>');
                $tr.append($td);
            }
        }
    },

    updateWorld: function() {
        console.log('updateWorld response');
        for (var i = 0; i < world.options.worldWidth; i++) {
            for (var j = 0; j < world.options.worldLenght; j++) {
                data.nextMatrix[i][j] = data.currentMatrix[i][j];
            }
        }
        var liveNeighbor;
        for (var i = 0; i < world.options.worldWidth; i++) {
            for (var j = 0; j < world.options.worldLenght; j++) {
                liveNeighbor = 0;
                console.log('i=', i, 'j=', j);
                try {
                    if ((data.currentMatrix[i - 1][j - 1]) && (data.currentMatrix[i - 1][j - 1] === 1)) {
                        liveNeighbor += 1;
                    }
                } catch (e) {
                }
                try {
                    if ((data.currentMatrix[i - 1][j]) && (data.currentMatrix[i - 1][j] === 1)) {
                        liveNeighbor += 1;
                    }
                } catch (e) {
                }
                try {
                    if ((data.currentMatrix[i - 1][j + 1]) && (data.currentMatrix[i - 1][j + 1] === 1)) {
                        liveNeighbor += 1;
                    }
                } catch (e) {
                }
                try {
                    if ((data.currentMatrix[i][j - 1]) && (data.currentMatrix[i][j - 1] === 1)) {
                        liveNeighbor += 1;
                    }
                } catch (e) {
                }
                try {
                    if ((data.currentMatrix[i][j + 1]) && (data.currentMatrix[i][j + 1] === 1)) {
                        liveNeighbor += 1;
                    }
                } catch (e) {
                }
                try {
                    if ((data.currentMatrix[i + 1][j - 1]) && (data.currentMatrix[i + 1][j - 1] === 1)) {
                        liveNeighbor += 1;
                    }
                } catch (e) {
                }
                try {
                    if ((data.currentMatrix[i + 1][j]) && (data.currentMatrix[i + 1][j] === 1)) {
                        liveNeighbor += 1;
                    }
                } catch (e) {
                }
                try {
                    if ((data.currentMatrix[i + 1][j + 1]) && (data.currentMatrix[i + 1][j + 1] === 1)) {
                        liveNeighbor += 1;
                    }
                } catch (e) {
                }
                try {
                    if ((data.currentMatrix[i][j] === 1) && (liveNeighbor <= 1)) {
                        data.nextMatrix[i][j] = 0;
                    }
                } catch (e) {
                }
                try {
                    if ((data.currentMatrix[i][j] === 1) && (liveNeighbor === 2)) {
                        data.nextMatrix[i][j] = 1;
                    }
                } catch (e) {
                }
                try {
                    if ((data.currentMatrix[i][j] === 1) && (liveNeighbor === 3)) {
                        data.nextMatrix[i][j] = 1;
                    }
                } catch (e) {
                }
                try {
                    if ((data.currentMatrix[i][j] === 1) && (liveNeighbor >= 4)) {
                        data.nextMatrix[i][j] = 0;
                    }
                } catch (e) {
                }
                try {
                    if ((data.currentMatrix[i][j] === 0) && (liveNeighbor === 3)) {
                        data.nextMatrix[i][j] = 1;
                    }
                } catch (e) {
                }
            }
        }
        for (var i = 0; i < world.options.worldWidth; i++) {
            for (var j = 0; j < world.options.worldLenght; j++) {
                data.currentMatrix[i][j] = data.nextMatrix[i][j];
            }
        }
        this.renderMatrix(data.currentMatrix);
    },

    renderMatrix: function(matrix) {
        for(var i = 0; i < world.options.worldWidth; i++){
            for(var j = 0; j < world.options.worldLenght; j++) {
                if (matrix[i][j] === 1) {
                    $(this.config.table)[0].children[i].cells[j].style.background = '#000000';
                }
                if (matrix[i][j] === 0) {
                    $(this.config.table)[0].children[i].cells[j].style.background = '#ffffff';
                }
            }
        }
    },

    handleTableClick: function() {
        var cell = event.target;
        var curRow = cell.parentNode.rowIndex;
        var curCol = cell.cellIndex;
        // try is here to avoid errors when mouse movements happens over few cells
        try {
            data.currentMatrix[curRow][curCol] = (data.currentMatrix[curRow][curCol]+1) % 2;
        }
        catch (e) {
        }
        this.renderMatrix(data.currentMatrix);
    }
};
