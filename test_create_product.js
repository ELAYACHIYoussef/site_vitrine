
async function createTestProduct() {
    const baseURL = 'http://localhost:8080/api';
    const authDirectURL = 'http://localhost:8081';

    try {
        console.log("Tentative de création d'un produit de test avec image et export Instagram...");

        // Get token via direct simulation on port 8081 to bypass gateway routing issues
        const simRes = await fetch(`${authDirectURL}/auth/google/simulate?email=selmanim113@gmail.com`, {
            redirect: 'manual'
        });

        const redirectUrl = simRes.headers.get('location');
        if (!redirectUrl) throw new Error("Failed to get redirect URL from simulation");

        const token = new URL(redirectUrl).searchParams.get('token');
        console.log("Token récupéré (Admin Role).");

        const formData = new FormData();
        formData.append('name', 'Gants de Boxe Instagram Elite');
        formData.append('category', 'sport');
        formData.append('categoryLabel', 'Sport');
        formData.append('price', '85.00');
        formData.append('stock', '12');
        formData.append('description', 'Des gants de boxe de haute qualité, parfaits pour les entraînements intensifs. Publié via l\'export Instagram.');
        formData.append('descriptionCourte', 'Gants de boxe pro.');
        formData.append('publishToInstagram', 'true');

        const blob = new Blob(['fake image content'], { type: 'image/jpeg' });
        formData.append('images', blob, 'boxe.jpg');

        const response = await fetch(`${baseURL}/catalog/products`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            console.log("Produit créé avec succès !");
            console.log("ID:", result.id);
            console.log("Lien vers le produit: http://localhost:5173/products/" + result.id);
            console.log("Instagram Sync Status:", result.instagramMediaId ? "PUBLIÉ SUR INSTAGRAM (Simulé)" : "Traitement Instagram terminé");
        } else {
            console.error("Erreur API:", result);
        }
    } catch (error) {
        console.error("Erreur lors de la création :", error.message);
    }
}

createTestProduct();
