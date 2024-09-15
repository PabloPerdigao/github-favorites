import { GithubUser} from "./GithubUser.js"
// class que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []    
 
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username) {
    try {

      const userExist = this.entries.find(entry => entry.login.toLowerCase() === username.toLowerCase())

      if(userExist) {
        throw new Error('Usuário já cadstrado!')
      }

      const user = await GithubUser.search(username)

      if (user.login === undefined) {
        throw new Error('Usuário não encontrado!')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()

    } catch(error) {
      alert(error.message)
    }
  }

  delete(user) {

    //Higher-order function | Funções de ata ordem - map, filter,find, reduce...) 
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
    this.save()
  }

}

// class que vi criar a visualzação e eventos do HTML 
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
    this.onadd()
  }

  onadd() {
    const addButton = this.root.querySelector('.search button') 
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')

      this.add(value)
    }
  }


  update() {
    this.removeAllTr()

      this.entries.forEach(user => {
        const row = this.createRow()

        row.querySelector('.user img').src = `https://github.com/${user.login}.png`

        row.querySelector('.user img').alt = `Imagem de ${user.name}` 
        row.querySelector('.user a').href = `https://github.com/${user.login}` 

        row.querySelector('.user p').textContent = user.name
        row.querySelector('.user span').textContent = user.login

        row.querySelector('.repositories').textContent = user.public_repos

        row.querySelector('.followers').textContent = user.followers

        row.querySelector('.remove').onclick = () => {
          const isOk = confirm('Tem certeza que desejar deletar essa linha?')
          if(isOk) {
            this.delete(user)
          }
        }

      this.tbody.append(row)
    })

    
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
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
    `
    return tr
  }

  removeAllTr() {
    
    this.tbody.querySelectorAll('tr').forEach((tr) => {
     tr.remove()
    });
  }

}