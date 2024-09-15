// class que vai conter a lógica dos dados
// como os dados serão estruturados
export class favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = [
      {
      login: 'pabloperdigao',
      name: "Pablo Perdigão",
      public_repos: '31',
      followers: '1'
    },

    {
      login: 'diego3g',
      name: "Diego Fernandes",
      public_repos: '71',
      followers: '31200'
    }
    ]

    
  }

}

// class que vi criar a visualzação e eventos do HTML 
export class FavoritesView extends favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
  }


  update() {
    this.removeAllTr()

      this.entries.forEach( user => {
      const row = this.createRow()

      row.querySelector('user img').src = ` https://github.com/${user.login}.png`

      row.querySelector('user img').alt = `Imagem de ${user.name}` 

      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login

      row.querySelector('.repositores').textContent = user.public_repos

      row.querySelector('followers').textContent = user.followers


      this.tbody.append(row)
    })

    
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <tr>
        <td class="user">
          <img src="https://github.com/pabloperdigao.png" alt="Imagem do Pablo Perdigão">
          <a href="https://github.com/pabloperdigao" target="_blank">
            <p>Pablo Perdigão</p>
            <span>pabloperdigao</span>
          </a>
        </td>
          
        <td class="repositories">
          31
        </td>
        <td class="followers">
          1
        </td>

        <td>
          <button class="remove">&times;</button>
        </td>
      </tr>
    
    `
    return tr
  }

  removeAllTr() {this.tbody.querySelectorAll('tr')
       .forEach((tr) => {
         tr.remove()
       })
  }

}