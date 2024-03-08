<template>
    <div class="game-of-life">
        <p></p>
        <div class="TheCanvasHere" ref="canvasHolder"></div>
        <button class="buttonGame" @click="togglePause">{{ isPaused ? 'Resume' : 'Pause' }}</button>
    </div>
</template>

<script>
import p5 from 'p5';

export default {
  name: 'GameOfLife',
  data() {
    return {
      sketch: null,
      grid: [],
      cols: 50,
      rows: 50,
      resolution: 10, // Initial resolution, will adjust based on screen size
      isPaused: false,
    };
  },
  methods: {
    setup(p) {
      // Adjust resolution based on screen size
      if (window.innerWidth < 768) { // Assuming 768px as a breakpoint for mobile
        this.resolution = 7; // Minimum resolution for mobile
      } else {
        this.resolution = 9.5; // Minimum resolution for desktop
      }
      p.createCanvas(this.cols * this.resolution, this.rows * this.resolution);
      p.frameRate(3); // Set the frame rate to 3 frames per second
      for (let i = 0; i < this.cols; i++) {
        this.grid[i] = [];
        for (let j = 0; j < this.rows; j++) {
          this.grid[i][j] = p.random() > 0.5 ? 1 : 0; // Randomly assign cells as alive or dead
        }
      }
      // Optional: Define an initial state for the grid here
    },
    draw(p) {
      p.background(21, 31, 39);
      if (!this.isPaused) {
        this.grid = this.nextGeneration(this.grid);
      }
      for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
          const x = i * this.resolution;
          const y = j * this.resolution;
          if (this.grid[i][j] === 1) {
            p.fill(198, 198, 198); // Set cell color
            p.noStroke(); // Remove cell border
            p.rect(x, y, this.resolution, this.resolution);
          }
        }
      }
    },
    nextGeneration(grid) {
      let next = grid.map(arr => [...arr]);
      // Apply Conway's rules
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          const state = grid[i][j];
          // Count live neighbors
          let sum = 0;
          for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
              const col = (i + x + this.cols) % this.cols;
              const row = (j + y + this.rows) % this.rows;
              sum += grid[col][row];
            }
          }
          sum -= state; // Remove self count
          // Apply rules
          if (state === 0 && sum === 3) {
            next[i][j] = 1;
          } else if (state === 1 && (sum < 2 || sum > 3)) {
            next[i][j] = 0;
          }
        }
      }
      return next;
    },
    togglePause() {
      this.isPaused = !this.isPaused;
    },
    mousePressed(p) {
      const col = Math.floor(p.mouseX / this.resolution);
      const row = Math.floor(p.mouseY / this.resolution);
      if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
        this.grid[col][row] = this.grid[col][row] === 1 ? 0 : 1;
      }
    },
    resizeCanvas(p) {
      // Dynamically adjust resolution based on screen size during resize
      if (window.innerWidth < 768) {
        this.resolution = 5;
      } else {
        this.resolution = 6;
      }
      const newWidth = this.cols * this.resolution;
      const newHeight = this.rows * this.resolution;
      p.resizeCanvas(newWidth, newHeight);
    },
  },

  mounted() {
    this.sketch = new p5(p => {
      p.setup = () => this.setup(p);
      p.draw = () => this.draw(p);
      p.mousePressed = () => this.mousePressed(p);
      window.addEventListener('resize', () => this.resizeCanvas(p));
    }, this.$refs.canvasHolder);
  },

  beforeDestroy() {
    this.sketch.remove();
    window.removeEventListener('resize', () => this.resizeCanvas(p)); // Ensure to bind the correct context or use an arrow function
  },
};
</script>

<style scoped>
.game-of-life {
text-align: center;
padding: 20px;
}

.buttonGame {
    font-family: 'IBM Plex Mono', monospace;
    background-color: #2D404F;
    border: none;
    color: #C6C6C6;
}

.TheCanvasHere {
  cursor: pointer;
}
</style>
  