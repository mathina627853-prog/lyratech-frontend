document.addEventListener("DOMContentLoaded", function () { 
 
    const productForm = 
        document.getElementById("productForm"); 
 
    const productId = 
        document.getElementById("productId"); 
 
    const productName = 
        document.getElementById("productName"); 
 
    const categoryId = 
        document.getElementById("categoryId"); 
 
    const price = 
        document.getElementById("price"); 
 
    const productTableBody = 
        document.getElementById("productTableBody"); 
 
    const formTitle = 
        document.getElementById("formTitle"); 
 
    const submitButton = 
        document.getElementById("submitButton"); 
 
    const cancelButton = 
        document.getElementById("cancelButton"); 
 
    const message = 
        document.getElementById("message"); 
 
 
    // Railway Backend API
    const productsApi = 
        "https://lyratech-backend-production.up.railway.app/api/products"; 
 
    const categoriesApi = 
        "https://lyratech-backend-production.up.railway.app/api/categories"; 
 
 
    let categories = []; 
 
 
    // ============================== 
    // LOAD CATEGORIES 
    // ============================== 
 
    function loadCategories() { 
 
        fetch(categoriesApi) 
 
            .then(function (response) { 
 
                if (!response.ok) { 
                    throw new Error( 
                        "Unable to load categories" 
                    ); 
                } 
 
                return response.json(); 
 
            }) 
 
            .then(function (data) { 
 
                categories = data; 
 
                categoryId.innerHTML = 
                    '<option value="">Select Category</option>'; 
 
 
                categories.forEach(function (category) { 
 
                    const option = 
                        document.createElement("option"); 
 
                    option.value = 
                        category.categoryId; 
 
                    option.textContent = 
                        category.categoryName; 
 
                    categoryId.appendChild(option); 
 
                }); 
 
            }) 
 
            .catch(function (error) { 
 
                console.error(error); 
 
                showMessage( 
                    "Unable to load categories.", 
                    true 
                ); 
 
            }); 
 
    } 
 
 
    // ============================== 
    // LOAD PRODUCTS 
    // ============================== 
 
    function loadProducts() { 
 
        productTableBody.innerHTML = 
            '<tr><td colspan="5">Loading products...</td></tr>'; 
 
 
        fetch(productsApi) 
 
            .then(function (response) { 
 
                if (!response.ok) { 
                    throw new Error( 
                        "Unable to load products" 
                    ); 
                } 
 
                return response.json(); 
 
            }) 
 
            .then(function (products) { 
 
                productTableBody.innerHTML = ""; 
 
 
                if (products.length === 0) { 
 
                    productTableBody.innerHTML = 
                        '<tr><td colspan="5">No products available.</td></tr>'; 
 
                    return; 
                } 
 
 
                products.forEach(function (product) { 
 
                    const row = 
                        document.createElement("tr"); 
 
 
                    // ID 
 
                    const idCell = 
                        document.createElement("td"); 
 
                    idCell.textContent = 
                        product.productId; 
 
 
                    // Name 
 
                    const nameCell = 
                        document.createElement("td"); 
 
                    nameCell.textContent = 
                        product.productName; 
 
 
                    // Category 
 
                    const categoryCell = 
                        document.createElement("td"); 
 
                    categoryCell.textContent = 
                        getCategoryName( 
                            product.categoryId 
                        ); 
 
 
                    // Price 
 
                    const priceCell = 
                        document.createElement("td"); 
 
                    priceCell.textContent = 
                        "₹" + 
                        Number(product.price) 
                            .toLocaleString("en-IN"); 
 
 
                    // Actions 
 
                    const actionCell = 
                        document.createElement("td"); 
 
 
                    const editButton = 
                        document.createElement("button"); 
 
                    editButton.className = 
                        "edit-button"; 
 
                    editButton.textContent = 
                        "Edit"; 
 
 
                    editButton.addEventListener( 
                        "click", 
                        function () { 
 
                            startEdit(product); 
 
                        } 
                    ); 
 
 
                    const deleteButton = 
                        document.createElement("button"); 
 
                    deleteButton.className = 
                        "delete-button"; 
 
                    deleteButton.textContent = 
                        "Delete"; 
 
 
                    deleteButton.addEventListener( 
                        "click", 
                        function () { 
 
                            deleteProduct( 
                                product.productId 
                            ); 
 
                        } 
                    ); 
 
 
                    actionCell.appendChild(editButton); 
 
                    actionCell.appendChild(deleteButton); 
 
 
                    row.appendChild(idCell); 
 
                    row.appendChild(nameCell); 
 
                    row.appendChild(categoryCell); 
 
                    row.appendChild(priceCell); 
 
                    row.appendChild(actionCell); 
 
 
                    productTableBody.appendChild(row); 
 
                }); 
 
            }) 
 
            .catch(function (error) { 
 
                console.error(error); 
 
                productTableBody.innerHTML = 
                    '<tr><td colspan="5">Unable to load products.</td></tr>'; 
 
            }); 
 
    } 
 
 
    // ============================== 
    // GET CATEGORY NAME 
    // ============================== 
 
    function getCategoryName(id) { 
 
        const category = 
            categories.find(function (item) { 
 
                return item.categoryId === id; 
 
            }); 
 
 
        if (category) { 
            return category.categoryName; 
        } 
 
 
        return "Unknown Category"; 
 
    } 
 
 
    // ============================== 
    // ADD / UPDATE PRODUCT 
    // ============================== 
 
    productForm.addEventListener( 
        "submit", 
        function (event) { 
 
            event.preventDefault(); 
 
 
            const name = 
                productName.value.trim(); 
 
            const selectedCategory = 
                categoryId.value; 
 
            const productPrice = 
                price.value; 
 
 
            if ( 
                name === "" || 
                selectedCategory === "" || 
                productPrice === "" 
            ) { 
 
                showMessage( 
                    "Please fill all fields.", 
                    true 
                ); 
 
                return; 
            } 
 
 
            // UPDATE 
 
            if (productId.value !== "") { 
 
                updateProduct( 
                    productId.value, 
                    name, 
                    Number(selectedCategory), 
                    Number(productPrice) 
                ); 
 
            } 
 
            // ADD 
 
            else { 
 
                addProduct( 
                    name, 
                    Number(selectedCategory), 
                    Number(productPrice) 
                ); 
 
            } 
 
        } 
    ); 
 
 
    // ============================== 
    // ADD PRODUCT 
    // ============================== 
 
    function addProduct( 
        name, 
        category, 
        productPrice 
    ) { 
 
        fetch(productsApi, { 
 
            method: "POST", 
 
            headers: { 
                "Content-Type": "application/json" 
            }, 
 
            body: JSON.stringify({ 
 
                productName: name, 
 
                categoryId: category, 
 
                price: productPrice 
 
            }) 
 
        }) 
 
        .then(function (response) { 
 
            if (!response.ok) { 
 
                throw new Error( 
                    "Unable to add product" 
                ); 
 
            } 
 
            return response.json(); 
 
        }) 
 
        .then(function () { 
 
            showMessage( 
                "Product added successfully." 
            ); 
 
            resetForm(); 
 
            loadProducts(); 
 
        }) 
 
        .catch(function (error) { 
 
            console.error(error); 
 
            showMessage( 
                "Unable to add product.", 
                true 
            ); 
 
        }); 
 
    } 
 
 
    // ============================== 
    // START EDIT 
    // ============================== 
 
    function startEdit(product) { 
 
        productId.value = 
            product.productId; 
 
        productName.value = 
            product.productName; 
 
        categoryId.value = 
            product.categoryId; 
 
        price.value = 
            product.price; 
 
        formTitle.textContent = 
            "Edit Product"; 
 
        submitButton.textContent = 
            "Update Product"; 
 
        message.textContent = ""; 
 
        productName.focus(); 
 
    } 
 
 
    // ============================== 
    // UPDATE PRODUCT 
    // ============================== 
 
    function updateProduct( 
        id, 
        name, 
        category, 
        productPrice 
    ) { 
 
        fetch(productsApi + "/" + id, { 
 
            method: "PUT", 
 
            headers: { 
                "Content-Type": "application/json" 
            }, 
 
            body: JSON.stringify({ 
 
                productName: name, 
 
                categoryId: category, 
 
                price: productPrice 
 
            }) 
 
        }) 
 
        .then(function (response) { 
 
            if (!response.ok) { 
 
                throw new Error( 
                    "Unable to update product" 
                ); 
 
            } 
 
            return response.json(); 
 
        }) 
 
        .then(function () { 
 
            showMessage( 
                "Product updated successfully." 
            ); 
 
            resetForm(); 
 
            loadProducts(); 
 
        }) 
 
        .catch(function (error) { 
 
            console.error(error); 
 
            showMessage( 
                "Unable to update product.", 
                true 
            ); 
 
        }); 
 
    } 
 
 
    // ============================== 
    // DELETE PRODUCT 
    // ============================== 
 
    function deleteProduct(id) { 
 
        const confirmDelete = 
            confirm( 
                "Are you sure you want to delete this product?" 
            ); 
 
 
        if (!confirmDelete) { 
            return; 
        } 
 
 
        fetch(productsApi + "/" + id, { 
 
            method: "DELETE" 
 
        }) 
 
        .then(function (response) { 
 
            if (!response.ok) { 
 
                throw new Error( 
                    "Unable to delete product" 
                ); 
 
            } 
 
        }) 
 
        .then(function () { 
 
            showMessage( 
                "Product deleted successfully." 
            ); 
 
            resetForm(); 
 
            loadProducts(); 
 
        }) 
 
        .catch(function (error) { 
 
            console.error(error); 
 
            showMessage( 
                "Unable to delete product.", 
                true 
            ); 
 
        }); 
 
    } 
 
 
    // ============================== 
    // CANCEL / RESET 
    // ============================== 
 
    cancelButton.addEventListener( 
        "click", 
        function () { 
 
            resetForm(); 
 
        } 
    ); 
 
 
    function resetForm() { 
 
        productForm.reset(); 
 
        productId.value = ""; 
 
        formTitle.textContent = 
            "Add Product"; 
 
        submitButton.textContent = 
            "Add Product"; 
 
        message.textContent = ""; 
 
    } 
 
 
    // ============================== 
    // MESSAGE 
    // ============================== 
 
    function showMessage( 
        text, 
        isError 
    ) { 
 
        message.textContent = 
            text; 
 
 
        if (isError) { 
 
            message.style.color = 
                "#c0392b"; 
 
        } else { 
 
            message.style.color = 
                "#1976a3"; 
 
        } 
 
    } 
 
    loadCategories(); 
 
    loadProducts(); 
 
});