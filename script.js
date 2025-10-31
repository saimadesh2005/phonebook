    // Mock API endpoint (simulated)
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';

    let contacts = [];
    let editIndex = -1;

    // Fetch default data from API
    async function loadDefaultData() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Map API data to name and number
        contacts = data.slice(0, 5).map(user => ({
          name: user.name,
          number: user.phone.split(' ')[0] || 'N/A'
        }));

        renderContacts();
      } catch (err) {
        console.error('Error loading API data:', err);
      }
    }

    function renderContacts() {
      const tbody = document.getElementById('contactList');
      tbody.innerHTML = '';

      contacts.forEach((c, i) => {
        const row = `<tr class="bg-#20c997">
          <td>${c.name}</td>
          <td>${c.number}</td>
          <td>
            <button class="bg-success" onclick="editContact(${i})">Edit</button>
            <button class="bg-danger" onclick="deleteContact(${i})">Delete</button>
          </td>
        </tr>`;
        tbody.innerHTML += row;
      });
    }

    function addContact() {
      const name = document.getElementById('name').value.trim();
      const number = document.getElementById('number').value.trim();

      if (!name || !number) {
        alert('Please enter both name and number.');
        return;
      }

      contacts.push({ name, number });
      clearForm();
      renderContacts();
    }

    function editContact(index) {
      document.getElementById('name').value = contacts[index].name;
      document.getElementById('number').value = contacts[index].number;
      editIndex = index;
    }

    function updateContact() {
      if (editIndex === -1) {
        alert('Select a contact to edit first.');
        return;
      }

      const name = document.getElementById('name').value.trim();
      const number = document.getElementById('number').value.trim();

      if (!name || !number) {
        alert('Please enter both name and number.');
        return;
      }

 contacts[editIndex] = { name, number };
      editIndex = -1;
      clearForm();
      renderContacts();
    }

function deleteContact(index) {
      if (confirm('Are you sure you want to delete this contact?')) {
        contacts.splice(index, 1);
        renderContacts();
      }
    }
function clearForm() {
      document.getElementById('name').value = '';
      document.getElementById('number').value = '';
    }
    window.onload = loadDefaultData;