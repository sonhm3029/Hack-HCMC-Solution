from icrawler.builtin import GoogleImageCrawler
from utils.file import secure_filename, generateUniquePrefix
import os
import multiprocessing

queries = [
    # ("lon bia Heineken trong quán nhậu", 50),
    # ("lon bia Heineken trong siêu thị", 50),
    # ("lon bia Heineken trong tiệm tạp hóa", 50),
    # ("chai bia Heineken trong quán nhậu", 50),
    # ("chai bia Heineken trong siêu thị", 50),
    # ("chai bia Heineken trong tiệm tạp hóa", 50),

    # ("lon bia Tiger trong quán nhậu", 50),
    # ("lon bia Tiger trong siêu thị", 50),
    # ("lon bia Tiger trong tiệm tạp hóa", 50),
    # ("chai bia Tiger trong quán nhậu", 50),
    # ("chai bia Tiger trong siêu thị", 50),
    # ("chai bia Tiger trong tiệm tạp hóa", 50),

    # ("lon bia Bia Việt trong quán nhậu", 50),
    # ("lon bia Bia Việt trong siêu thị", 50),
    # ("lon bia Bia Việt trong tiệm tạp hóa", 50),
    # ("chai bia Bia Việt trong quán nhậu", 50),
    # ("chai bia Bia Việt trong siêu thị", 50),
    # ("chai bia Bia Việt trong tiệm tạp hóa", 50),

    # ("lon bia Larue trong quán nhậu", 50),
    # ("lon bia Larue trong siêu thị", 50),
    # ("lon bia Larue trong tiệm tạp hóa", 50),
    # ("chai bia Larue trong quán nhậu", 50),
    # ("chai bia Larue trong siêu thị", 50),
    # ("chai bia Larue trong tiệm tạp hóa", 50),

    # ("lon bia Bivina trong quán nhậu", 50),
    # ("lon bia Bivina trong siêu thị", 50),
    # ("lon bia Bivina trong tiệm tạp hóa", 50),
    # ("chai bia Bivina trong quán nhậu", 50),
    # ("chai bia Bivina trong siêu thị", 50),
    # ("chai bia Bivina trong tiệm tạp hóa", 50),

    # ("lon bia Edelweiss trong quán nhậu", 50),
    # ("lon bia Edelweiss trong siêu thị", 50),
    # ("lon bia Edelweiss trong tiệm tạp hóa", 50),
    # ("chai bia Edelweiss trong quán nhậu", 50),
    # ("chai bia Edelweiss trong siêu thị", 50),
    # ("chai bia Edelweiss trong tiệm tạp hóa", 50),

    # ("lon bia Strongbow trong quán nhậu", 50),
    # ("lon bia Strongbow trong siêu thị", 50),
    # ("lon bia Strongbow trong tiệm tạp hóa", 50),
    # ("chai bia Strongbow trong quán nhậu", 50),
    # ("chai bia Strongbow trong siêu thị", 50),
    # ("chai bia Strongbow trong tiệm tạp hóa", 50),

    # ("lon bia Sài Gòn trong quán nhậu", 50),
    # ("lon bia Sài Gòn trong siêu thị", 50),
    # ("lon bia Sài Gòn trong tiệm tạp hóa", 50),
    # ("chai bia Sài Gòn trong quán nhậu", 50),
    # ("chai bia Sài Gòn trong siêu thị", 50),
    # ("chai bia Sài Gòn trong tiệm tạp hóa", 50),

    # ("lon bia 333 trong quán nhậu", 50),
    # ("lon bia 333 trong siêu thị", 50),
    # ("lon bia 333 trong tiệm tạp hóa", 50),
    # ("chai bia 333 trong quán nhậu", 50),
    # ("chai bia 333 trong siêu thị", 50),
    # ("chai bia 333 trong tiệm tạp hóa", 50),

    # ("lon bia Huda trong quán nhậu", 50),
    # ("lon bia Huda trong siêu thị", 50),
    # ("lon bia Huda trong tiệm tạp hóa", 50),
    # ("chai bia Huda trong quán nhậu", 50),
    # ("chai bia Huda trong siêu thị", 50),
    # ("chai bia Huda trong tiệm tạp hóa", 50)
    # ("Chai bia Heineken", 30),
    # ("Lon bia Heineken", 30),
    
    # ("Chai bia Tiger", 30),
    # ("Lon bia Tiger", 30),
    
    # ("Chai bia Bia Việt", 30),
    # ("Lon bia Bia Việt", 30),
    
    # ("Chai bia Larue", 30),
    # ("Lon bia Larue", 30),
    
    # ("Chai bia Bivina", 30),
    # ("Lon bia Bivina", 30),
    
    # ("Chai bia Edelweiss", 30),
    # ("Lon bia Edelweiss", 30),
    
    # ("Chai Strongbow", 30),
    # ("Lon Strongbow", 30),
    
    # ("Chai bia bia Sài Gòn", 30),
    # ("Lon bia bia Sài Gòn", 30),
    
    # ("Chai bia 333", 30),
    # ("Lon bia 333", 30),
    
    # ("Chai bia Huda", 30),
    # ("Lon bia Huda", 30),
    
    ("Người uống bia tại quán bar", 30),
    ("Nhóm bạn uống bia ở quán bia cỏ", 30),
    ("Tiệc uống bia tại nhà hàng", 30),
    ("Người uống bia tại sự kiện", 30),
    ("Nhóm bạn uống bia cùng nhau", 30),
    ("Tiệc tùng có bia", 30),
    ("BBQ với bia", 30),
    ("Dã ngoại với bia", 30),
    ("Người nâng ly chúc mừng với bia", 30),
    ("Tiệc uống bia", 30),
    ("Đám cỗ uống bia", 30)
]


root = "icrawler_downloads"

def download_images(root_dir, keyword, max_num):
    google_crawler = GoogleImageCrawler(storage={'root_dir': root_dir})
    google_crawler.crawl(keyword=keyword, max_num=max_num)

if __name__ == "__main__":
    processes = []
    for query, max_num in queries:
        download_root = secure_filename(query)
        download_root = os.path.join(root, download_root)
        if not os.path.exists(download_root):
            os.makedirs(download_root)
            
        p = multiprocessing.Process(target=download_images, args=(download_root, query, max_num))
        processes.append(p)
        p.start()
        
    for p in processes:
        p.join()
