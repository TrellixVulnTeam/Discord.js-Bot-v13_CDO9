const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "cuddle",
    category: 'reactions',
    aliases: ['cdl', 'cud'],
    usage: '[prefix]cuddle [tag/id người dùng]',
    descriptions: 'Âu yếm nhau nè <3',

    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

        if(member.id === message.author.id) {
            return message.channel.send('Bạn không thể tự âu yếm mình =)) !')
        }

        let robber = message.author;
        let searchEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor({name: 'Đợi xíu nha, đừng có mà bựa ...', iconURL: `${client.user.displayAvatarURL({ size: 1024, dynamic: true })}`})
        
        let searching = await message.channel.send({embeds: [searchEmbed]})

        const url = await fetch(`https://nekos.life/api/v2/img/cuddle`)
        const data = await url.json().then(data => {
            const noData = new MessageEmbed()
                .setColor('BLURPLE')
                .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh`)
            
            if(!data) {
                return searching.edit({embeds: [noData]})
            }

            const imageEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor({name: 'Reaction: Cuddle', iconURL: `${client.user.displayAvatarURL({ size: 1024, dynamic: true })}`})
                .setDescription(`${message.member.displayName} đã ôm ấp ${member.displayName}`)
                .setImage(data.url)

            return searching.edit({embeds: [imageEmbed]})
        })
    }
}