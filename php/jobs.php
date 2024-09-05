<!DOCTYPE html>
<html lang="lv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mūsu darbi - SIA EVOS M</title>
    <link rel="stylesheet" href="../style.jobs.css"> <!-- Ensure your original styles are applied -->
    <style>
        .job-list {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
        }
        .job {
            flex: 1 0 21%; /* Adjusts the size of images and ensures 4 images per row */
            box-sizing: border-box;
            max-width: 23%;
            position: relative;
            cursor: pointer;
        }
        .job img {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.3s ease; /* Smooth scale effect */
        }
        .job:hover img {
            transform: scale(1.05); /* Slightly enlarge image on hover */
        }
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.9);
            justify-content: center;
            align-items: center;
            text-align: center;
        }
        .modal-content {
            max-width: 90%;
            max-height: 90%;
            margin: auto;
        }
        .close {
            position: absolute;
            top: 20px;
            right: 30px;
            color: #fff;
            font-size: 30px;
            font-weight: bold;
            cursor: pointer;
        }
        .close:hover,
        .close:focus {
            color: #bbb;
            text-decoration: none;
            cursor: pointer;
        }
        .pagination {
            margin: 20px 0;
            text-align: center;
        }
        .pagination a {
            margin: 0 5px;
            padding: 8px 16px;
            background-color: #f4f4f4;
            text-decoration: none;
            color: #333;
            border: 1px solid #ddd;
        }
        .pagination a:hover {
            background-color: #ddd;
        }
        footer {
            background-color: #800000;
            color: white;
            text-align: center;
            padding: 10px 0;
            position: relative;
            bottom: 0;
            width: 100%;
            box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <header>
        <h1>Mūsu darbi</h1>
    </header>
    <nav>
    <a href="../html/index.html">SĀKUMS</a>
        <a href="../html/about.html">PAR MUMS</a>
        <a href="../html/services.html">PAKALPOJUMI</a>
        <a href="../php/jobs.php">MŪSU DARBI</a>
        <a href="../html/contact.html">KONTAKTI</a>
    </nav>
    <div class="container">
        <div class="job-list">
            <?php
                $dir = "../job_pictures/";
                $images = glob($dir . "*.{jpg,png,gif,jpeg}", GLOB_BRACE);
                $imagesPerPage = 12;
                $totalImages = count($images);
                $totalPages = ceil($totalImages / $imagesPerPage);
                $currentPage = isset($_GET['page']) ? (int)$_GET['page'] : 1;
                $currentPage = max(1, min($totalPages, $currentPage));
                $startIndex = ($currentPage - 1) * $imagesPerPage;
                $imagesForPage = array_slice($images, $startIndex, $imagesPerPage);

                foreach ($imagesForPage as $image) {
                    $imageName = basename($image);

                    echo "<div class='job' onclick='openModal(\"{$image}\")'>
                              <img src='{$image}' alt=''>
                          </div>";
                }
            ?>
        </div>

        <div class="pagination">
            <?php
                for ($i = 1; $i <= $totalPages; $i++) {
                    if ($i == $currentPage) {
                        echo "<strong>$i</strong>";
                    } else {
                        echo "<a href='?page=$i'>$i</a>";
                    }
                }
            ?>
        </div>
    </div>

    <!-- Modal for displaying larger image -->
    <div id="myModal" class="modal">
        <span class="close" onclick="closeModal()">&times;</span>
        <img class="modal-content" id="img01">
    </div>

    <script>
        function openModal(src) {
            var modal = document.getElementById("myModal");
            var modalImg = document.getElementById("img01");
            
            modal.style.display = "flex";
            modalImg.src = src;
        }

        function closeModal() {
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
        }
    </script>
    </div>
    <footer>
        <p>&copy; 2024 SIA EVOS M. Visas tiesības aizsargātas.</p>
    </footer>
</body>
</html>
