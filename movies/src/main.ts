import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  makeSwaggerDocumentation(app);
  await app.listen(3000);
}
bootstrap();

function makeSwaggerDocumentation(app: INestApplication) {
	const options = new DocumentBuilder()
		.setTitle('Movies Service')
		.setVersion('1.0')
		.setContact('Antônio Eugênio', 'https://github.com/eugenio165', 'eugenio165.as@gmail.com')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('/docs', app, document);
}
