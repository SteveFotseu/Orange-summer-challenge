// Gestionnaire d'événements pour le formulaire
const form = document.getElementById('employeeForm');
const employeesList = document.getElementById('employeesList');

// Charger les employés depuis localStorage au chargement
window.addEventListener('load', loadEmployees);

// Soumission du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const employee = {
        lastName: document.getElementById('lastName').value,
        firstName: document.getElementById('firstName').value,
        email: document.getElementById('email').value,
        position: document.getElementById('position').value
    };

    // Validation
    if (!validateEmployee(employee)) {
        return;
    }

    // Ajouter l'employé
    addEmployee(employee);
    
    // Réinitialiser le formulaire
    form.reset();
});

// Fonction de validation
function validateEmployee(employee) {
    if (!employee.lastName || !employee.firstName || !employee.email || !employee.position) {
        alert('Tous les champs sont obligatoires');
        return false;
    }

    if (!isValidEmail(employee.email)) {
        alert('Veuillez entrer une adresse email valide');
        return false;
    }

    return true;
}

// Validation de l'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Ajouter un employé
function addEmployee(employee) {
    // Charger les employés existants
    let employees = JSON.parse(localStorage.getItem('employees') || '[]');
    
    // Ajouter le nouvel employé
    employees.push(employee);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('employees', JSON.stringify(employees));
    
    // Mettre à jour l'affichage
    displayEmployees(employees);
}

// Supprimer un employé
function deleteEmployee(index) {
    // Charger les employés existants
    let employees = JSON.parse(localStorage.getItem('employees') || '[]');
    
    // Récupérer les informations de l'employé à supprimer
    const employeeToDelete = employees[index];
    const fullName = `${employeeToDelete.firstName} ${employeeToDelete.lastName}`;
    
    // Créer la boîte de dialogue de confirmation
    const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer l'employé ${fullName} ?`);
    
    if (confirmation) {
        // Supprimer l'employé
        employees.splice(index, 1);
        
        // Sauvegarder dans localStorage
        localStorage.setItem('employees', JSON.stringify(employees));
        
        // Mettre à jour l'affichage
        displayEmployees(employees);
        
        // Afficher un message de confirmation
        alert('Employé supprimé avec succès !');
    }
}

// Afficher la liste des employés
function displayEmployees(employees) {
    const employeeCount = document.getElementById('employeeCount');
    if (employeeCount) {
        employeeCount.textContent = employees.length;
    }

    employeesList.innerHTML = '';
    
    employees.forEach((employee, index) => {
        const employeeDiv = document.createElement('div');
        employeeDiv.className = 'employee-item';
        
        const fullName = `${employee.firstName} ${employee.lastName}`;
        
        employeeDiv.innerHTML = `
            <div>
                <p><strong>Nom complet :</strong> ${fullName}</p>
                <p><strong>Email :</strong> ${employee.email}</p>
                <p><strong>Poste :</strong> ${employee.position}</p>
            </div>
            <button onclick="deleteEmployee(${index})" class="orange-button">Supprimer</button>
        `;
        
        employeesList.appendChild(employeeDiv);
    });
}

// Charger les employés depuis localStorage
function loadEmployees() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    displayEmployees(employees);
}
