import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Category } from "./entity/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import * as fs from 'fs';
import { UpdateCategoryDto } from "./dto/update-category-status.dto";
import { CategoryStatus } from "./enum/category-status.enum";

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  async createCategory(
    createCategoryDto: CreateCategoryDto,
    file: Express.Multer.File,
  ) {
    try {
      const path = file.path;
      const { position, name } = createCategoryDto;
      const category = this.create({
        banner: path,
        position,
        status: CategoryStatus.ACTIVE,
        name,
      });

      if (category) await this.save(category);
      return {
        code: 200,
        message: 'Category created successfully',
        category
      };

    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateCategory(
    updateCategoryDto: UpdateCategoryDto,
    file: Express.Multer.File,
    id: string,
  ) {
    try {
      const category = await this.findOne(id);
      if (!category)
        return {
          code: 404,
          message: 'Category not found'
        };

      if (file) {
        if (fs.existsSync(category.banner)) {
          fs.unlinkSync(`./${category.banner}`);
        }
        category.banner = file.path;
      }

      const { name, position } = updateCategoryDto;
      category.name = name;
      category.position = position;
      const result = await this.save(category);
      if (result)
        return {
          code: 200,
          message: 'Update category successful'
        };
    } catch (error) {
      throw new BadRequestException('Server error');
    }
  }

  async destroyCategory(id: string) {
    try {
      const category = await this.findOne(id);
      if (!category)
        return {
          code: 404,
          message: 'Category not found'
        };
      const result = await this.softRemove(category);
      if (result)
        return {
          code: 200,
          message: 'Delete category successful'
        }
    } catch (error) {
      throw new BadRequestException('Server error');
    }
  }
}