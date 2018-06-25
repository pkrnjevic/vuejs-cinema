<template>
    <div id='movie-list'>
        <div v-if="filteredMovies.length">
            <movie-item v-for='movie in filteredMovies' v-bind:movie="movie.movie">
                <div class="movie-sessions">
                    <div v-for="session in filteredSessions(movie.sessions)"
                         class="session-time-wrapper tooltip-wrapper"
                         v-tooltip="{seats:session.seats}"
                         v-bind:key="session.id">
                        <div class="session-time">{{ formatSessionTime(session.time)}}</div>
                    </div>
                </div>
            </movie-item>
        </div>
        <div v-else-if="movies.length">
            {{ noResults }}
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>
    import times from '../util/times'
    import MovieItem from './MovieItem.vue'

    export default {
        props: ['genre', 'day', 'time', 'movies'],
        methods: {
            formatSessionTime(raw) {
                return this.$moment(raw).format('h:mm A')
            },
            filteredSessions(sessions) {
                return sessions.filter(this.sessionPassesTimeFilter)
            },
            moviePassesGenreFilter(movie) {
                let mg = movie.movie.Genre.split(', ');
                for (let g of this.genre) {
                    if (!mg.includes(g)) return false
                }
                return true;
            },
            moviePassesSessionFilter(movie) {
                return movie.sessions.filter(session => {
                    return this.sessionPassesTimeFilter(session)
                }).length > 0
            },
            sessionPassesTimeFilter(session) {
                let st = this.$moment(session.time);
                if (!st.isSame(this.day, 'day'))
                    return false;
                else if (this.time.length === 0 || this.time.length === 2)
                    return true;
                else if (this.time[0] === times.AFTER_6PM)
                    return st.hour() >= 18;
                else
                    return st.hour() < 18;
            }
        },
        computed: {
            filteredMovies() {
                return this.movies
                    .filter(this.moviePassesGenreFilter)
                    .filter(this.moviePassesSessionFilter)
            },
            noResults() {
                return 'No results for ' + (this.time.concat(this.genre)).join(', ') + '.';
            }
        },
        components: {
            MovieItem
        }
    }
</script>

<style scoped>

</style>