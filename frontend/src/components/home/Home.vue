<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Empréstimo de jogos" />
        <div class="stats">
            <Stat title="Jogo 01" :value="stat.name"
                icon="fa fa-folder" color="#d54d50" />
            <!-- <Stat title="Artigos" :value="stat.articles"
                icon="fa fa-file" color="#3bc480" />
            <Stat title="Usuários" :value="stat.users"
                icon="fa fa-user" color="#3282cd" /> -->
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'Home',
    components: { PageTitle, Stat },
    data: function() {
        return {
            stat: {}
        }
    },
    methods: {
        getStats() {
            axios.get(`${baseApiUrl}/games/1`).then(res => this.stat = res.data)
        }
    },
    mounted() {
        this.getStats()
        console.log(baseApiUrl)
    }
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>
