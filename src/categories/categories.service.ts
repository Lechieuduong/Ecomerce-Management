import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { CategoryStatus } from './enum/category-status.enum';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category-status.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private readonly categoriesRepository: CategoriesRepository,
  ) { }

  /**
  * Create a new category
  * @param createCategoryDto CreateCategoryDto
  */
  create(createCategoryDto: CreateCategoryDto, file: Express.Multer.File) {
    return this.categoriesRepository.createCategory(createCategoryDto, file);
  }

  /**
  * Get all categories
  * 
  */
  findAll() {
    return this.categoriesRepository.find({ where: { status: CategoryStatus.ACTIVE } });
  }

  /**
  * Get a category by ID
  * @param id Category ID
  */
  findOne(id: string) {
    return this.categoriesRepository.findOne({
      //relations: ['products'],
      where: { id },
    });
  }

  /**
  * Update a category by ID.
  * @param id Category ID.
  * @param updateCategoryDto UpdateCategoryDto.
  */
  update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    file: Express.Multer.File,
  ) {
    return this.categoriesRepository.updateCategory(updateCategoryDto, file, id);
  }

  remove(id: string) {
    return this.categoriesRepository.destroyCategory(id);
  }
}


