<template>
    <div id="overview">
        <day-select v-bind:selected="day"></day-select>
        <div id="main" style="display:flex">
            <movie-list v-bind:genre="genre" v-bind:time="time" v-bind:movies="movies" v-bind:day="day" style="flex-basis:75%"></movie-list>
            <movie-filter style="flex-basis:25%"></movie-filter>
        </div>
    </div>
</template>

<script>
    import MovieList from './MovieList.vue'
    import MovieFilter from './MovieFilter.vue'
    import DaySelect from './DaySelect.vue'

    export default {
        props: ['genre', 'day', 'time', 'movies'],
        components: {
            MovieList,
            MovieFilter,
            DaySelect
        },
    }
</script>

<style scoped>

</style>