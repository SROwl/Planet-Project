<script>
import axios from "axios";
export default {
  name: "ExoPlanetData",
  template: `<div id="ExoPlanetData" class="data">
    <div class="loader" v-if="loading">
      loading
    </div>
    <div class="data__facts col">
      <div class="data__facts-title">Facts</div>
      <div class="data__facts-hottest col">
        <div class="data-title">The Hottest Star</div>
        <div class="data-planet">{{ hottestStarPlanet }}</div>
        <div class="hottest__temp">{{ highestTemp }}k</div>
      </div>
      <div class="data__facts-orphans col">
        <div class="data-title">Orphan Planets</div>
        <div class="data-planet">{{ orphanPlanets }}</div>
      </div>
    </div>
    <div class="data__tl">
      <ul class="col">
        <li v-for="year in years" class="col">
          <div class="data__tl-year col"><span>{{ year }}</span> <span>SM &times; {{ timeLine[year].small }}</span> <span>MD &times; {{ timeLine[year].medium }}</span> <span>LG &times; {{ timeLine[year].large }}</span></div>
          <div class="data__tl-planet">
            <span v-for="smAmount in timeLine[year].small" class="data__tl-planet--sm">
              <!-- smAmount --></span>
            <span v-for="mdAmount in timeLine[year].medium" class="data__tl-planet--md">
              <!-- mdAmount --></span>
            <span v-for="lgAmount in timeLine[year].large" class="data__tl-planet--lg">
              <!-- lgAmount --></span>
          </div>
        </li>
      </ul>
    </div>
  </div>`,
  data() {
    return {
      highestTemp: null,
      orphanPlanets: null,
      timeLine: null,
      hottestStarPlanet: null,
      years: null,
      loading: null
    };
  },
  mounted() {
    this.loading = true;
    axios
      .get(
        "https://gist.githubusercontent.com/joelbirchler/66cf8045fcbb6515557347c05d789b4a/raw/9a196385b44d4288431eef74896c0512bad3defe/exoplanets"
      )
      .then(response => {
        const theData = response.data;
        this.planetName = theData.map(name => name.PlanetIdentifier);
        this.theTemps = theData.map(temp => temp.HostStarTempK);
        this.highestTemp = Math.max.apply(Math, this.theTemps);
        this.starMass = theData.map(starMass => starMass.HostStarMassSlrMass);
        this.starRad = theData.map(starRad => starRad.HostStarRadiusSlrRad);
        this.starMetal = theData.map(
          starMetal => starMetal.HostStarMetallicity
        );
        this.starAge = theData.map(starAge => starAge.HostStarAgeGyr);

        var newTimeline = {};

        // Get size of planets
        function getSize(planet) {
          if (planet.RadiusJpt >= 2) {
            return "l";
          }
          if (planet.RadiusJpt >= 1) {
            return "m";
          }
          return "s";
        }

        //Country empty to get missing starts for orphans
        var countEmpty = 0;

        var i;
        for (i = 0; i < theData.length; i++) {
          var planet = theData[i];
          var size = getSize(planet);

          // Create timeline objects if none exist
          if (!newTimeline[planet.DiscoveryYear]) {
            newTimeline[planet.DiscoveryYear] = {
              small: 0,
              medium: 0,
              large: 0
            };
          }

          // Add 1 to each size in year
          switch (size) {
            case "s":
              newTimeline[planet.DiscoveryYear].small++;
              break;
            case "m":
              newTimeline[planet.DiscoveryYear].medium++;
              break;
            case "l":
              newTimeline[planet.DiscoveryYear].large++;
              break;
          }

          // Check if all star values are blank, adds to countEmpty to get orphan planets
          if (
            this.starMass[i] === "" &&
            this.starRad[i] === "" &&
            this.starMetal[i] === "" &&
            this.theTemps[i] === "" &&
            this.starAge[i] === ""
          ) {
            countEmpty++;
          }

          // Create hottest star
          if (this.theTemps[i] === this.highestTemp) {
            this.hottestStarPlanet = this.planetName[i];
          }
        }

        // Add no timeline to available value
        this.timeLine = newTimeline;
        this.years = Object.keys(newTimeline).filter(x => x.length > 0);
        this.orphanPlanets = countEmpty;

        //Close loader
        this.loading = false;
      });
  }
};
</script>

<style scoped lang="scss">
@function random-decimal($val) {
  $decimal: random(10) * 0.75;
  @return $decimal;
}

.data {
  display: flex;
  flex-wrap: wrap;
  &-title {
    font-size: 3em;
    text-transform: uppercase;
    letter-spacing: -4px;
    margin-bottom: 30px;
    transform: rotate(4deg);

    @media (max-width: 991px) {
      font-size: 2em;
    }
  }
  &-planet {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    font-weight: bold;
    background: radial-gradient(#00a1ff 30%, transparent 100%),
      linear-gradient(-50deg, #00ff08 40%, transparent 60%),
      radial-gradient(#00ff08 30%, transparent 0%);
    box-shadow: inset -1px 0px 3px 0px white,
      -1px 0px 20px -5px rgba(255, 255, 255, 0.5);
  }
  &__facts {
    position: fixed;
    width: 50vw;
    align-items: flex-start;
    align-items: center;
    background: #080808;
    right: 0;
    height: 100%;
    padding-top: 60px;
    padding-bottom: 60px;
    overflow: scroll;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0;
    }
    @media (max-width: 991px) {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    &-title {
      font-size: 5em;
      font-weight: bold;
      letter-spacing: -6px;
      text-transform: uppercase;
      position: relative;
      right: 0;
      transform: rotate(10deg);
      margin-left: auto;
      margin-right: 50px;
      margin-bottom: 30px;
      @media (max-width: 991px) {
        position: relative;
        top: 0;
        right: 0;
        transform: rotate(0deg);
        margin: auto;
        margin-bottom: 30px;
      }
    }
    &-hottest {
      position: relative;
      justify-content: center;
      align-items: center;
      width: 500px;
      margin-bottom: 60px;
      .data-planet {
        position: absolute;
        top: 25%;
        left: 10px;
        @media (max-width: 991px) {
          left: 15%;
          top: 70px;
        }
      }
      .hottest {
        &__temp {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 300px;
          width: 300px;
          background-color: orange;
          border-radius: 50%;
          font-size: 2em;
          font-weight: bold;
          background: radial-gradient(orange, transparent),
            radial-gradient(#ff2300 50%, transparent);
          box-shadow: inset 0px 0px 10px -5px #fe8f00,
            -1px 0px 44px -10px #ff7600;
          @media (max-width: 991px) {
            height: 250px;
            width: 250px;
          }
        }
      }
    }
    &-orphans {
      align-items: center;
      .data-planet {
        height: 200px;
        width: 200px;
        font-size: 3.5em;
        background: radial-gradient(#004d79 10%, transparent 100%),
          linear-gradient(160deg, #00c4ff -10%, transparent 40%),
          radial-gradient(#004475 0%, transparent 60%);
        box-shadow: inset -1px 0px 3px 0px #00dcff,
          -1px 0px 20px -5px rgba(255, 255, 255, 0.1);
      }
    }
  }
  &__tl {
    position: relative;
    width: 50%;
    @media (max-width: 991px) {
      width: 100%;
    }
    &::-webkit-scrollbar {
      width: 0px;
      background: transparent; /* make scrollbar transparent */
    }
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
      li {
        position: relative;
        justify-content: flex-start;
        height: 250px;
        width: 100%;
        overflow: hidden;
      }
    }
    &-year {
      position: absolute;
      z-index: 1;
      align-self: flex-end;
      background: #080808;
      padding: 15px;
      margin-bottom: 15px;
      box-sizing: border-box;
      text-align: right;
      span {
        font-size: 0.75em;
        &:first-child {
          font-size: 2em;
        }
      }
    }
    &-planet {
      display: flex;
      align-items: center;
      position: relative;
      height: 100%;
      width: 100%;
      $lrgHeight: 100px;
      $lrgWidth: 100px;

      &--sm,
      &--md,
      &--lg {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 50%;
        width: 100%;
        box-shadow: 0 0px 10px -5px white;
      }
      &--sm {
        height: calc(#{$lrgHeight} / 8);
        width: calc(#{$lrgWidth} / 8);
      }
      &--md {
        height: calc(#{$lrgHeight} / 3);
        width: calc(#{$lrgWidth} / 3);
      }
      &--lg {
        height: $lrgHeight;
        width: $lrgWidth;
      }
    }
  }
}

@for $i from 1 through 1300 {
  .data__tl-planet {
    span:nth-child(#{$i}) {
      transform: translate(random(50) + vw, random(100) - 50 + px);
      background: radial-gradient(
        #fff -60%,
        rgba(random(100), random(150), random(255), random-decimal(1)) 55%,
        transparent
      );

      @media (max-width: 767px) {
        transform: translate(random(100) + vw, random(100) - 50 + px);
      }
    }
  }
}
</style>
